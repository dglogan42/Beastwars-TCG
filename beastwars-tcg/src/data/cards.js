/**
 * Unified card pool: all expansion set libraries.
 * Individual sets live under ./sets/*.json
 */
import { EXPANSIONS, getExpansion, expansionForCardId } from './expansions';
import bw from './sets/beast-wars.json';
import g1a from './sets/g1-autobots.json';
import g1d from './sets/g1-decepticons.json';
import bm from './sets/beast-machines.json';
import arm from './sets/armada.json';
import ani from './sets/animated.json';

export { EXPANSIONS, getExpansion, expansionForCardId };

export const FACTIONS = {
  Maximal: { color: '#2b7bb9', dark: '#163d5c', label: 'Maximal' },
  Predacon: { color: '#8b1a2b', dark: '#4a0e18', label: 'Predacon' },
  Autobot: { color: '#e53935', dark: '#b71c1c', label: 'Autobot' },
  Decepticon: { color: '#6a1b9a', dark: '#4a148c', label: 'Decepticon' },
  Vehicon: { color: '#00897b', dark: '#004d40', label: 'Vehicon' },
  'Mini-Con': { color: '#ef6c00', dark: '#e65100', label: 'Mini-Con' },
  Other: { color: '#6b5b95', dark: '#3d2f5c', label: 'Other' },
};

export const RARITIES = {
  common: { label: 'Common', stars: 1, color: '#9e9e9e' },
  uncommon: { label: 'Uncommon', stars: 2, color: '#4caf50' },
  rare: { label: 'Rare', stars: 3, color: '#2196f3' },
  epic: { label: 'Epic', stars: 4, color: '#9c27b0' },
  legendary: { label: 'Legendary', stars: 5, color: '#ff9800' },
};

/** @typedef {import('./expansions').EXPANSIONS[number]} Expansion */

/**
 * @typedef {Object} CardDef
 * @property {number} id
 * @property {string} set
 * @property {string} [number]
 * @property {string} name
 * @property {string} faction
 * @property {string[]} types
 * @property {string} beast
 * @property {string} [altMode]
 * @property {string} species
 * @property {string} ability
 * @property {string} abilityText
 * @property {number} cost
 * @property {number} hp
 * @property {number} atk
 * @property {number} def
 * @property {number} spd
 * @property {string} rarity
 * @property {string} flavor
 * @property {string} artBg
 * @property {string} sprite
 */

/** @type {CardDef[]} */
export const CARDS = [...bw, ...g1a, ...g1d, ...bm, ...arm, ...ani].map((c) => ({
  ...c,
  altMode: c.altMode || c.beast,
  number: c.number || String(c.id).padStart(3, '0'),
}));

export const DECK_SIZE = 6;
export const MAX_BENCH = 2;
export const MAX_ENERGON = 5;
export const STARTING_HAND = 3;

export function getCard(id) {
  return CARDS.find((c) => c.id === id);
}

export function cardsByFaction(faction) {
  return CARDS.filter((c) => c.faction === faction);
}

export function cardsBySet(setCode) {
  return CARDS.filter((c) => c.set === setCode);
}

export function setCodeForCard(card) {
  return card?.set || expansionForCardId(card?.id)?.code || '???';
}

/** Balanced 6-card preset for a faction or expansion code. */
export function defaultDeck(key = 'Maximal') {
  let pool = [];
  if (FACTIONS[key]) {
    pool = CARDS.filter((c) => c.faction === key);
  } else if (getExpansion(key)) {
    pool = cardsBySet(key);
  } else if (key === 'Predacon') {
    pool = CARDS.filter((c) => c.faction === 'Predacon' || c.faction === 'Vehicon');
  }

  if (pool.length < DECK_SIZE) {
    pool = CARDS.filter((c) => c.faction === 'Maximal' || c.faction === 'Autobot');
  }

  return [...pool]
    .sort((a, b) => a.cost - b.cost || rarityRank(b.rarity) - rarityRank(a.rarity))
    .slice(0, DECK_SIZE)
    .map((c) => c.id);
}

function rarityRank(r) {
  return { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5 }[r] || 0;
}

/** AI prefers villains from any expansion. */
export function aiDeck() {
  const villains = CARDS.filter((c) =>
    ['Predacon', 'Decepticon', 'Vehicon'].includes(c.faction)
  );
  const picks = [...villains].sort(() => Math.random() - 0.5).slice(0, DECK_SIZE);
  const boss =
    villains.find((c) => c.name.includes('Megatron') && c.rarity === 'legendary') ||
    villains.find((c) => c.rarity === 'legendary');
  if (boss && !picks.some((c) => c.id === boss.id)) {
    picks[picks.length - 1] = boss;
  }
  return picks.map((c) => c.id);
}

export function expansionStats() {
  return EXPANSIONS.map((exp) => {
    const cards = cardsBySet(exp.code);
    return {
      ...exp,
      count: cards.length,
      legendaries: cards.filter((c) => c.rarity === 'legendary').length,
    };
  });
}
