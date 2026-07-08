import {
  CARDS,
  DECK_SIZE,
  MAX_BENCH,
  MAX_ENERGON,
  STARTING_HAND,
  getCard,
} from '../data/cards';

let uid = 1;
function nextUid() {
  return uid++;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createFighter(cardId) {
  const def = getCard(cardId);
  return {
    uid: nextUid(),
    cardId,
    hp: def.hp,
    maxHp: def.hp,
    atkBonus: 0,
    poisoned: false,
    stunned: false,
    diveUsed: false,
    rebuildUsed: false,
    vokUsed: false,
    firstAttackDone: false,
  };
}

function makeSide(deckIds, name) {
  const deck = shuffle(deckIds).map((id) => createFighter(id));
  const hand = deck.splice(0, STARTING_HAND);
  return {
    name,
    deck,
    hand,
    active: null,
    bench: [],
    discard: [],
    energon: 1,
    hasAttacked: false,
    hasRetreated: false,
  };
}

export function createBattle(playerDeckIds, aiDeckIds) {
  uid = 1;
  const player = makeSide(playerDeckIds, 'You');
  const enemy = makeSide(aiDeckIds, 'Predacon AI');

  // Auto-play first hand card as active if possible
  if (player.hand.length) {
    player.active = player.hand.shift();
  }
  if (enemy.hand.length) {
    enemy.active = enemy.hand.shift();
  }

  return {
    player,
    enemy,
    turn: 'player',
    turnNumber: 1,
    phase: 'main', // main | gameover
    winner: null,
    log: ['The Beast Wars begin! Deploy your fighters and claim victory.'],
    selectedHand: null,
    selectedBench: null,
  };
}

function log(state, msg) {
  return { ...state, log: [msg, ...state.log].slice(0, 40) };
}

function sideOf(state, who) {
  return who === 'player' ? state.player : state.enemy;
}

function setSide(state, who, side) {
  return who === 'player' ? { ...state, player: side } : { ...state, enemy: side };
}

function cloneFighter(f) {
  return f ? { ...f } : null;
}

function cloneSide(s) {
  return {
    ...s,
    deck: s.deck.map(cloneFighter),
    hand: s.hand.map(cloneFighter),
    bench: s.bench.map(cloneFighter),
    discard: s.discard.map(cloneFighter),
    active: cloneFighter(s.active),
  };
}

function defOf(fighter) {
  return getCard(fighter.cardId);
}

function effectiveAtk(state, who, fighter) {
  if (!fighter) return 0;
  const def = defOf(fighter);
  let atk = def.atk + fighter.atkBonus;
  const side = sideOf(state, who);
  const opp = sideOf(state, who === 'player' ? 'enemy' : 'player');

  // Leadership: if Optimus was just "buffing" — handled as +1 if Optimus on field same turn
  // Inferno: +2 if Megatron in play
  if (def.ability === 'The Royalty') {
    const megatron =
      (side.active && side.active.cardId === 11) ||
      side.bench.some((b) => b.cardId === 11);
    if (megatron) atk += 2;
  }
  // Ambition
  if (def.ability === 'Ambition' && side.energon <= 3) atk += 2;
  // Vendetta
  if (def.ability === 'Vendetta' && opp.active && opp.active.cardId === 19) atk += 3;
  // Dive Bomb first attack
  if (def.ability === 'Dive Bomb' && !fighter.firstAttackDone) atk += 2;
  // Reckless
  if (def.ability === 'Reckless') atk += 2;

  return Math.max(0, atk);
}

function damageReduction(state, defenderWho, defender) {
  let red = 0;
  const def = defOf(defender);
  if (def.ability === 'Fortress') red += 1;

  const side = sideOf(state, defenderWho);
  // Scorponok on bench bodyguard
  if (side.bench.some((b) => defOf(b).ability === 'Bodyguard')) red += 1;
  // Transmutate active friend guard for allies — if Transmutate is active, allies on... actually ability says allies take -2 while this is active. So when defender is not Transmutate and Transmutate is active:
  if (
    side.active &&
    defOf(side.active).ability === 'Friend Guard' &&
    defender.uid !== side.active.uid
  ) {
    red += 2;
  }
  // If Transmutate is active and is the defender, it still has def
  if (side.active && defOf(side.active).ability === 'Friend Guard' && defender.uid === side.active.uid) {
    // Transmutate itself doesn't get the ally bonus
  }
  // Wait: "Allies take −2 damage while this is active" — Transmutate is active, so when Transmutate is active, OTHER allies get -2. When attacking Transmutate, no special.
  // Also if someone is active and Transmutate is on bench? Ability says "while this is active" meaning while Transmutate is the active fighter.
  // Re-read: "Cannot attack. Allies take −2 damage while this is active."
  // So only when Transmutate is the active, allies (bench) take -2. That's weird for a defender active...
  // Better interpretation: while Transmutate is in play (active or bench), your other fighters take -2.
  // I'll use: while Transmutate is in play on your side, other fighters take -2.
  const hasTrans =
    (side.active && side.active.cardId === 21) ||
    side.bench.some((b) => b.cardId === 21);
  if (hasTrans && defender.cardId !== 21) red += 2;

  return red;
}

function applyDamage(state, attackerWho, attacker, defenderWho, baseDmg) {
  let s = state;
  const defSide = cloneSide(sideOf(s, defenderWho));
  const defender = defSide.active;
  if (!defender) return { state: s, ko: false, dmg: 0 };

  const atkDef = defOf(attacker);
  let dmg = baseDmg;

  // Cold Efficiency ignores DEF
  if (atkDef.ability !== 'Cold Efficiency') {
    const defStat = defOf(defender).def;
    dmg = Math.max(1, dmg - Math.floor(defStat / 3));
  }

  dmg = Math.max(1, dmg - damageReduction(s, defenderWho, defender));

  defender.hp -= dmg;

  // Immortal Rage
  if (defOf(defender).ability === 'Immortal Rage') {
    defender.atkBonus += 1;
  }

  // Poison from Blackarachnia
  if (atkDef.ability === 'Venom') {
    defender.poisoned = true;
  }

  // Sabotage
  if (atkDef.ability === 'Sabotage' && Math.random() < 0.3) {
    const isNoble = defOf(defender).ability === 'Noble Heart';
    if (!isNoble) {
      defender.stunned = true;
      s = log(s, `${defOf(defender).name} is sabotaged and will skip its next attack!`);
    }
  }

  // Reckless recoil
  if (atkDef.ability === 'Reckless') {
    const atkSide = cloneSide(sideOf(s, attackerWho));
    if (atkSide.active && atkSide.active.uid === attacker.uid) {
      atkSide.active.hp -= 1;
      s = setSide(s, attackerWho, atkSide);
      s = log(s, `${atkDef.name} takes 1 recoil damage.`);
      // check if attacker KO from recoil later
    }
  }

  s = setSide(s, defenderWho, defSide);
  s = log(s, `${defOf(attacker).name} hits ${defOf(defender).name} for ${dmg} damage!`);

  return resolveKo(s, defenderWho, attackerWho);
}

function resolveKo(state, defenderWho, attackerWho) {
  let s = state;
  const defSide = cloneSide(sideOf(s, defenderWho));
  const atkSide = cloneSide(sideOf(s, attackerWho));
  let defender = defSide.active;
  if (!defender || defender.hp > 0) {
    // also check attacker recoil KO
    if (atkSide.active && atkSide.active.hp <= 0) {
      return finishKo(s, attackerWho, defenderWho);
    }
    return { state: s, ko: false, dmg: 0 };
  }

  return finishKo(s, defenderWho, attackerWho);
}

function finishKo(state, deadWho, killerWho) {
  let s = state;
  const deadSide = cloneSide(sideOf(s, deadWho));
  const killerSide = cloneSide(sideOf(s, killerWho));
  const dead = deadSide.active;
  if (!dead || dead.hp > 0) return { state: s, ko: false };

  const deadDef = defOf(dead);

  // Rebuild (Waspinator)
  if (deadDef.ability === 'Rebuild' && !dead.rebuildUsed && deadSide.bench.length < MAX_BENCH) {
    dead.rebuildUsed = true;
    dead.hp = 4;
    deadSide.active = null;
    deadSide.bench.push(dead);
    s = setSide(s, deadWho, deadSide);
    s = log(s, `Wasz… Waspinator rebuildz! Returns to bench with 4 HP.`);
    // promote if needed
    s = promoteIfNeeded(s, deadWho);
    return { state: s, ko: false };
  }

  // Code of Hero
  if (deadDef.ability === 'Code of Hero' && killerSide.active) {
    killerSide.active.hp -= 3;
    s = log(s, `Code of Hero! ${deadDef.name} strikes back for 3 as it falls!`);
  }

  // YEEESS energon
  if (killerSide.active && defOf(killerSide.active).ability === 'YEEESS') {
    killerSide.energon = Math.min(MAX_ENERGON, killerSide.energon + 1);
    s = log(s, `YEEESS! Megatron gains +1 Energon.`);
  }

  deadSide.discard.push(dead);
  deadSide.active = null;
  s = setSide(s, deadWho, deadSide);
  s = setSide(s, killerWho, killerSide);
  s = log(s, `${deadDef.name} is offline!`);

  // Killer might also be dead from Code of Hero
  if (killerSide.active && killerSide.active.hp <= 0) {
    s = finishKo(s, killerWho, deadWho).state;
  }

  s = promoteIfNeeded(s, deadWho);
  s = checkWinner(s);
  return { state: s, ko: true };
}

function promoteIfNeeded(state, who) {
  let s = state;
  const side = cloneSide(sideOf(s, who));
  if (side.active) return s;
  if (side.bench.length) {
    side.active = side.bench.shift();
    s = setSide(s, who, side);
    s = log(s, `${side.name} sends out ${defOf(side.active).name}!`);
    return s;
  }
  // try hand auto for AI only at game start — not mid game
  return s;
}

function checkWinner(state) {
  let s = state;
  const p = s.player;
  const e = s.enemy;
  const pAlive = p.active || p.bench.length || p.hand.length || p.deck.length;
  const eAlive = e.active || e.bench.length || e.hand.length || e.deck.length;

  // Win if opponent has no active and no bench (can't fight) and empty hand/deck for promote
  const pCanFight = p.active || p.bench.length > 0;
  const eCanFight = e.active || e.bench.length > 0;

  if (!eCanFight && !e.hand.length && !e.deck.length) {
    s = { ...s, phase: 'gameover', winner: 'player' };
    s = log(s, 'Victory! The Maximals secure the planet!');
  } else if (!pCanFight && !p.hand.length && !p.deck.length) {
    s = { ...s, phase: 'gameover', winner: 'enemy' };
    s = log(s, 'Defeat… The Predacons claim the energon.');
  } else if (!eCanFight && e.hand.length === 0) {
    // no active, no bench, hand might still have cards that need to be played — if they have hand but no active, they can play next turn
    if (!e.active && !e.bench.length && e.hand.length === 0 && e.deck.length === 0) {
      s = { ...s, phase: 'gameover', winner: 'player' };
      s = log(s, 'Victory! Enemy forces eliminated.');
    }
  }

  // simpler: no active and no bench = must play from hand; if can't afford or empty hand at start of their turn with no active, they lose
  if (!p.active && !p.bench.length && p.hand.length === 0) {
    s = { ...s, phase: 'gameover', winner: 'enemy' };
    s = log(s, 'Defeat! No fighters remaining.');
  }
  if (!e.active && !e.bench.length && e.hand.length === 0) {
    s = { ...s, phase: 'gameover', winner: 'player' };
    s = log(s, 'Victory! Predacon ranks are empty.');
  }

  return s;
}

export function playFromHand(state, handIndex, asActive = false) {
  if (state.phase === 'gameover' || state.turn !== 'player') return state;
  let s = { ...state, player: cloneSide(state.player) };
  const card = s.player.hand[handIndex];
  if (!card) return state;
  const def = defOf(card);
  if (s.player.energon < def.cost) {
    return log(s, `Not enough Energon for ${def.name} (need ${def.cost}).`);
  }
  if (!s.player.active || asActive) {
    if (s.player.active && !asActive) {
      // play to bench
    } else if (!s.player.active) {
      s.player.energon -= def.cost;
      s.player.hand.splice(handIndex, 1);
      s.player.active = card;
      s = applyOnPlay(s, 'player', card);
      s = log(s, `You deploy ${def.name} as your active fighter!`);
      return s;
    }
  }
  if (s.player.bench.length >= MAX_BENCH) {
    return log(s, `Bench is full (max ${MAX_BENCH}).`);
  }
  s.player.energon -= def.cost;
  s.player.hand.splice(handIndex, 1);
  s.player.bench.push(card);
  s = applyOnPlay(s, 'player', card);
  s = log(s, `You bench ${def.name}.`);
  return s;
}

function applyOnPlay(state, who, fighter) {
  let s = state;
  const def = defOf(fighter);
  const side = cloneSide(sideOf(s, who));

  if (def.ability === 'Web Lab' && side.deck.length) {
    side.hand.push(side.deck.shift());
    s = setSide(s, who, side);
    s = log(s, `${def.name} researches a card from the deck.`);
  }
  if (def.ability === 'Leadership') {
    s = log(s, `Leadership! Allies feel inspired (+1 ATK flavor this turn).`);
    // grant +1 atkBonus to active if different
    const side2 = cloneSide(sideOf(s, who));
    if (side2.active && side2.active.uid !== fighter.uid) {
      side2.active.atkBonus += 1;
    }
    side2.bench.forEach((b) => {
      if (b.uid !== fighter.uid) b.atkBonus += 1;
    });
    s = setSide(s, who, side2);
  }
  if (def.ability === 'Council Agent') {
    const opp = sideOf(s, who === 'player' ? 'enemy' : 'player');
    const names = opp.hand.map((f) => defOf(f).name).join(', ') || '(empty)';
    s = log(s, `Ravage scans the enemy hand: ${names}`);
  }
  return s;
}

export function attack(state) {
  if (state.phase === 'gameover' || state.turn !== 'player') return state;
  let s = state;
  const p = s.player;
  if (!p.active || !s.enemy.active) return log(s, 'No valid target.');
  if (p.hasAttacked) return log(s, 'Already attacked this turn.');
  if (p.active.stunned) return log(s, `${defOf(p.active).name} is stunned and cannot attack.`);
  if (defOf(p.active).ability === 'Friend Guard') {
    return log(s, `${defOf(p.active).name} cannot attack.`);
  }

  const atk = effectiveAtk(s, 'player', p.active);
  if (atk <= 0) {
    return log(s, 'This fighter cannot deal damage.');
  }

  const player = cloneSide(p);
  player.hasAttacked = true;
  player.active.firstAttackDone = true;
  s = { ...s, player };

  const result = applyDamage(s, 'player', player.active, 'enemy', atk);
  return result.state;
}

export function useVokPower(state) {
  if (state.phase === 'gameover' || state.turn !== 'player') return state;
  let s = state;
  const p = cloneSide(s.player);
  if (!p.active || defOf(p.active).ability !== 'Vok Power') return s;
  if (p.active.vokUsed) return log(s, 'Vok Power already used.');
  p.active.vokUsed = true;
  s = { ...s, player: p };
  s = log(s, 'Tigerhawk unleashes Vok Power!');

  const e = cloneSide(s.enemy);
  const hit = [];
  if (e.active) {
    e.active.hp -= 4;
    hit.push(e.active);
  }
  e.bench.forEach((b) => {
    b.hp -= 4;
    hit.push(b);
  });
  s = { ...s, enemy: e };

  // resolve KOs
  if (e.active && e.active.hp <= 0) {
    s = finishKo(s, 'enemy', 'player').state;
  }
  // bench KOs
  const e2 = cloneSide(sideOf(s, 'enemy'));
  const deadBench = e2.bench.filter((b) => b.hp <= 0);
  e2.bench = e2.bench.filter((b) => b.hp > 0);
  deadBench.forEach((d) => {
    e2.discard.push(d);
    s = log(s, `${defOf(d).name} on the bench is destroyed by Vok energy!`);
  });
  s = setSide(s, 'enemy', e2);
  s = checkWinner(s);
  return s;
}

export function retreat(state, benchIndex) {
  if (state.phase === 'gameover' || state.turn !== 'player') return state;
  let s = state;
  const p = cloneSide(s.player);
  if (!p.active) return log(s, 'No active fighter.');
  if (p.hasRetreated) return log(s, 'Already retreated this turn.');
  if (p.energon < 1) return log(s, 'Need 1 Energon to retreat.');
  if (benchIndex < 0 || benchIndex >= p.bench.length) return s;

  p.energon -= 1;
  p.hasRetreated = true;
  const swap = p.bench[benchIndex];
  p.bench[benchIndex] = p.active;
  p.active = swap;
  s = { ...s, player: p };
  s = log(s, `Retreat! ${defOf(swap).name} takes the field.`);
  return s;
}

export function promoteFromBench(state, benchIndex) {
  // free promote only when active is empty
  if (state.phase === 'gameover' || state.turn !== 'player') return state;
  let s = state;
  const p = cloneSide(s.player);
  if (p.active) return log(s, 'Active slot occupied — use Retreat.');
  if (benchIndex < 0 || benchIndex >= p.bench.length) return s;
  p.active = p.bench.splice(benchIndex, 1)[0];
  s = { ...s, player: p };
  s = log(s, `${defOf(p.active).name} steps up as active!`);
  return s;
}

export function endTurn(state) {
  if (state.phase === 'gameover' || state.turn !== 'player') return state;
  let s = log(state, '— End of your turn —');
  s = enemyTurn(s);
  if (s.phase === 'gameover') return s;
  s = startPlayerTurn(s);
  return s;
}

function startPlayerTurn(state) {
  let s = state;
  const p = cloneSide(s.player);
  p.energon = Math.min(MAX_ENERGON, p.energon + 1);
  p.hasAttacked = false;
  p.hasRetreated = false;
  if (p.deck.length && p.hand.length < 6) {
    p.hand.push(p.deck.shift());
  }
  // poison
  if (p.active && p.active.poisoned) {
    p.active.hp -= 1;
    s = log(s, `${defOf(p.active).name} takes 1 poison damage.`);
  }
  // Nature's Call heal
  if (p.active && defOf(p.active).ability === "Nature's Call") {
    p.active.hp = Math.min(p.active.maxHp, p.active.hp + 2);
    s = log(s, `Nature's Call heals Tigatron for 2.`);
  }
  // clear stun at start of own turn after skipping
  if (p.active && p.active.stunned) {
    // stun means they skipped — clear at end of the turn they skipped. We clear at start of their turn after enemy stunned them — actually stun should clear after they skip attack once. Clear at start.
    p.active.stunned = false;
  }

  s = {
    ...s,
    player: p,
    turn: 'player',
    turnNumber: s.turnNumber + 1,
  };

  if (p.active && p.active.hp <= 0) {
    s = finishKo(s, 'player', 'enemy').state;
  }
  if (!p.active && p.bench.length) {
    s = promoteIfNeeded(s, 'player');
  }
  s = checkWinner(s);
  s = log(s, `— Your turn ${s.turnNumber} · Energon ${sideOf(s, 'player').energon} —`);
  return s;
}

function enemyTurn(state) {
  let s = { ...state, turn: 'enemy' };
  s = log(s, '— Predacon turn —');
  let e = cloneSide(s.enemy);
  e.energon = Math.min(MAX_ENERGON, e.energon + 1);
  e.hasAttacked = false;
  e.hasRetreated = false;

  if (e.deck.length && e.hand.length < 6) {
    e.hand.push(e.deck.shift());
  }
  if (e.active && e.active.poisoned) {
    e.active.hp -= 1;
    s = log(s, `${defOf(e.active).name} suffers poison.`);
  }
  if (e.active && defOf(e.active).ability === "Nature's Call") {
    e.active.hp = Math.min(e.active.maxHp, e.active.hp + 2);
  }
  if (e.active && e.active.stunned) {
    e.active.stunned = false;
  }

  s = { ...s, enemy: e };
  if (e.active && e.active.hp <= 0) {
    s = finishKo(s, 'enemy', 'player').state;
    if (s.phase === 'gameover') return s;
  }
  s = promoteIfNeeded(s, 'enemy');

  // AI: play cheapest affordable to bench/active
  e = cloneSide(s.enemy);
  let safety = 0;
  while (safety++ < 5) {
    if (!e.hand.length) break;
    const playable = e.hand
      .map((f, i) => ({ f, i, cost: defOf(f).cost }))
      .filter((x) => x.cost <= e.energon)
      .sort((a, b) => b.cost - a.cost);
    if (!playable.length) break;

    if (!e.active) {
      const pick = playable[0];
      e.energon -= pick.cost;
      e.hand.splice(pick.i, 1);
      e.active = pick.f;
      s = { ...s, enemy: e };
      s = applyOnPlay(s, 'enemy', pick.f);
      s = log(s, `Enemy deploys ${defOf(pick.f).name}!`);
      e = cloneSide(s.enemy);
      continue;
    }
    if (e.bench.length >= MAX_BENCH) break;
    const pick = playable[0];
    e.energon -= pick.cost;
    e.hand.splice(pick.i, 1);
    e.bench.push(pick.f);
    s = { ...s, enemy: e };
    s = applyOnPlay(s, 'enemy', pick.f);
    s = log(s, `Enemy benches ${defOf(pick.f).name}.`);
    e = cloneSide(s.enemy);
  }

  // Vok-like for AI Tigerhawk
  e = cloneSide(s.enemy);
  if (e.active && defOf(e.active).ability === 'Vok Power' && !e.active.vokUsed && Math.random() < 0.4) {
    e.active.vokUsed = true;
    s = { ...s, enemy: e };
    s = log(s, 'Enemy Tigerhawk uses Vok Power!');
    const p = cloneSide(s.player);
    if (p.active) p.active.hp -= 4;
    p.bench.forEach((b) => {
      b.hp -= 4;
    });
    p.bench = p.bench.filter((b) => {
      if (b.hp <= 0) {
        p.discard.push(b);
        return false;
      }
      return true;
    });
    s = { ...s, player: p };
    if (p.active && p.active.hp <= 0) {
      s = finishKo(s, 'player', 'enemy').state;
    }
  }

  // Attack
  e = cloneSide(sideOf(s, 'enemy'));
  const p = cloneSide(sideOf(s, 'player'));
  if (e.active && p.active && !e.active.stunned && defOf(e.active).ability !== 'Friend Guard') {
    // maybe retreat if low hp
    if (e.active.hp <= 3 && e.bench.length && e.energon >= 1 && Math.random() < 0.45) {
      const best = e.bench.reduce((a, b, i) => (b.hp > e.bench[a].hp ? i : a), 0);
      e.energon -= 1;
      const sw = e.bench[best];
      e.bench[best] = e.active;
      e.active = sw;
      s = { ...s, enemy: e };
      s = log(s, `Enemy retreats to ${defOf(sw).name}.`);
    } else {
      const atk = effectiveAtk(s, 'enemy', e.active);
      e.hasAttacked = true;
      e.active.firstAttackDone = true;
      s = { ...s, enemy: e };
      if (atk > 0) {
        const result = applyDamage(s, 'enemy', e.active, 'player', atk);
        s = result.state;
      }
    }
  }

  s = checkWinner(s);
  return s;
}

export function cardList() {
  return CARDS;
}

export function validateDeck(ids) {
  if (!Array.isArray(ids) || ids.length !== DECK_SIZE) {
    return { ok: false, error: `Deck must contain exactly ${DECK_SIZE} cards.` };
  }
  const unique = new Set(ids);
  if (unique.size !== ids.length) {
    return { ok: false, error: 'Duplicate cards are not allowed in this format.' };
  }
  for (const id of ids) {
    if (!getCard(id)) return { ok: false, error: `Unknown card id ${id}.` };
  }
  return { ok: true };
}
