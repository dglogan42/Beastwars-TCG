/**
 * Metadata extracted from the Pokémon TCG Live marketing page
 * (https://tcg.pokemon.com/en-us/tcgl/) and stored in ./tcglMetadata.json.
 *
 * Beast Wars overrides re-theme copy for this fan app while keeping
 * TCGL structure, design tokens, navigation, and featured card assets.
 */
import raw from './tcglMetadata.json';

export const tcglSource = {
  file: 'tcglMetadata.json',
  url: raw.sourceUrl,
  trackingPageType: raw.page.trackingPageType,
};

/** Design tokens from :root in tcgl.css */
export const tokens = raw.designTokens;

/** SEO / page meta from the saved HTML <head> */
export const pageMeta = raw.page;

/** Expansion list scraped from the TCGL nav */
export const expansions = raw.expansions;

/** Featured physical-card PNGs referenced on the TCGL page */
export const featuredCards = raw.featuredCards;

/** System requirements table structure from the page */
export const systemRequirements = raw.systemRequirements;

/** Tracking event names found as data-track-name */
export const trackingNames = raw.trackingNames;

/**
 * Site sections — same shape as TCGL Live landing, Beast Wars copy.
 * Gameplay routes still power Collection / Deck / Battle.
 */
export const siteSections = {
  about: {
    id: 'about',
    heading: 'About the Game',
    body:
      'Beast Wars TCG Live is the best way to learn how to duel Maximal and Predacon fighters at your own pace and at no cost. ' +
      'You’ll have access to every Beastdex card in the Standard format, Learning Lab–style tutorials, and starter decks you can try after opening the app. ' +
      'Rules mirror the in-app duel engine so everything you practice applies when you hit Battle.',
  },
  gameModes: {
    id: 'game-modes',
    heading: 'Game Modes',
    intro:
      'Beast Wars TCG Live makes it easy to learn new skills and strategies while enjoying the heat of battle. ' +
      'Use the modes below — inspired by the Pokémon TCG Live page structure — then jump into a live duel.',
    modes: [
      {
        id: 'standard',
        name: 'Standard',
        description:
          'Battle with a 6-card Beastdex deck in the full ruleset: Energon, active + bench, abilities, and KO win conditions.',
        route: '/battle',
      },
      {
        id: 'trainer-trials',
        name: 'Trainer Trials',
        description:
          'Varying challenge rulesets — try faction-locked decks (Maximal-only or Predacon-only) from the Deck Builder presets.',
        route: '/deck',
      },
      {
        id: 'build-and-battle',
        name: 'Build and Battle',
        description:
          'Emulate a prerelease: assemble a strike team in Deck Builder, then launch straight into Battle vs the Predacon AI.',
        route: '/deck',
      },
      {
        id: 'private',
        name: 'Learning Lab',
        description:
          'Study every fighter in the Collection — stats, abilities, and spark flavor text — before you wager Energon.',
        route: '/collection',
      },
    ],
  },
  battlePass: {
    id: 'battle-pass',
    heading: 'Battle Pass',
    body:
      'A new Battle Pass tracks with each Beastdex expansion drop. Complete duel quests to unlock cosmetics, boosters, and more. ' +
      'Gain experience by battling and level up for rewards — same cadence as Pokémon TCG Live expansions on the source page.',
    cta: { label: 'Enter Battle', route: '/battle' },
    images: ['/tcgl/battle-pass-cards-1.png', '/tcgl/battle-pass-cards-2.png'],
  },
  collection: {
    id: 'collection',
    heading: 'Build Your Card Collection',
    body:
      'Add new cards to your deck or collection! Browse the full Beastdex archive, filter by faction, and inspect ability text. ' +
      'Featured physical TCG art below is pulled from the saved Pokémon TCG Live page assets for gallery atmosphere.',
    redeemPrompt: raw.copy.redeemPrompt.replace(/Pokémon TCG/g, 'Beast Wars TCG'),
    cta: { label: 'Open Collection', route: '/collection' },
  },
  getStarted: {
    id: 'get-started',
    heading: 'Get Started',
    body:
      'First-time players: open Deck Builder, grab a Maximal or Predacon preset, then hit Battle. ' +
      'The duel engine guides you through Energon costs, deploying fighters, attacking, and ending turns.',
    steps: [
      'Browse the Collection to learn abilities',
      'Build a 6-card deck (or use a preset)',
      'Launch Beast Wars and duel the AI',
    ],
    cta: { label: 'Start Battle', route: '/battle' },
  },
  systemRequirements: {
    id: 'system-requirements',
    heading: 'System Requirements',
    ...systemRequirements,
  },
  footerLinks: [
    { label: 'Card Drop Rate Information', note: raw.copy.dropRate },
    { label: 'News and Announcements', note: raw.copy.news },
    { label: 'System Requirements', href: '#system-requirements' },
  ],
};

/** Top nav adapted from TCGL page sections + app routes */
export const mainNav = [
  { label: 'Overview', to: '/', hash: '#about' },
  { label: 'Game Modes', to: '/', hash: '#game-modes' },
  { label: 'Collection', to: '/collection' },
  { label: 'Deck Builder', to: '/deck' },
  { label: 'Battle', to: '/battle' },
];

/** Apply CSS custom properties from extracted tokens onto :root */
export function applyTcglTokens(root = document.documentElement) {
  Object.entries(tokens).forEach(([key, value]) => {
    // skip broken multi-line-ish leftovers
    if (!value || value.length > 200) return;
    root.style.setProperty(key, value);
  });
  // App theme aliases
  root.style.setProperty('--tcgl-red', tokens['--color-light-red'] || '#d40f10');
  root.style.setProperty('--tcgl-red-dark', tokens['--color-dark-red'] || '#b20607');
  root.style.setProperty('--tcgl-blue', tokens['--color-light-blue'] || '#5ec1ff');
  root.style.setProperty('--tcgl-blue-dark', tokens['--color-dark-blue'] || '#0670b2');
  root.style.setProperty('--tcgl-grey', tokens['--color-grey'] || '#323232');
  root.style.setProperty('--tcgl-font', tokens['--font-body-tcgl'] || '"Exo", sans-serif');
  root.style.setProperty('--tcgl-font-body', tokens['--font-body'] || '"PT Sans", sans-serif');
}

export default raw;
