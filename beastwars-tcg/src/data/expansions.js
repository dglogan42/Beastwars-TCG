/**
 * Full expansion set catalog for Beast Wars TCG Live.
 * Each set is a legal “product line” with its own code, era, and roster.
 */

export const EXPANSIONS = [
  {
    id: 'BW01',
    code: 'BW01',
    name: 'Beast Wars: Spark of Earth',
    shortName: 'Beast Wars',
    era: 'Beast Era',
    year: 1996,
    description:
      'Maximals and Predacons crash on prehistoric Earth. Beast modes, Energon storms, and the first Spark Wars.',
    color: '#2b7bb9',
    accent: '#8b1a2b',
    cardIdMin: 1,
    cardIdMax: 99,
  },
  {
    id: 'G1A',
    code: 'G1A',
    name: 'Generation 1: Autobot Vanguard',
    shortName: 'G1 Autobots',
    era: 'Generation 1',
    year: 1984,
    description:
      'The Autobots of Cybertron — Freedom is the right of all sentient beings. Trucks, cars, and rescue craft ready for war.',
    color: '#e53935',
    accent: '#1565c0',
    cardIdMin: 100,
    cardIdMax: 199,
  },
  {
    id: 'G1D',
    code: 'G1D',
    name: 'Generation 1: Decepticon Empire',
    shortName: 'G1 Decepticons',
    era: 'Generation 1',
    year: 1984,
    description:
      'Megatron’s war machine — jets, cassettes, combiners, and tyrants who would conquer Earth and Cybertron alike.',
    color: '#6a1b9a',
    accent: '#c62828',
    cardIdMin: 200,
    cardIdMax: 299,
  },
  {
    id: 'BM01',
    code: 'BM01',
    name: 'Beast Machines: Reformatting',
    shortName: 'Beast Machines',
    era: 'Beast Era',
    year: 1999,
    description:
      'Return to a sterile Cybertron. Organic technorganic Maximals vs Vehicon armies under a dragon-form Megatron.',
    color: '#00897b',
    accent: '#5e35b1',
    cardIdMin: 300,
    cardIdMax: 399,
  },
  {
    id: 'ARM01',
    code: 'ARM01',
    name: 'Armada: Powerlinx Rising',
    shortName: 'Armada',
    era: 'Unicron Trilogy',
    year: 2002,
    description:
      'Autobots, Decepticons, and Mini-Cons. Powerlinx partnerships and the race to stop Unicron’s hunger.',
    color: '#ef6c00',
    accent: '#283593',
    cardIdMin: 400,
    cardIdMax: 499,
  },
  {
    id: 'ANI01',
    code: 'ANI01',
    name: 'Animated: Detroit Defenders',
    shortName: 'Animated',
    era: 'Animated',
    year: 2007,
    description:
      'Rookie Autobots on Earth, Elite Guard intrigue, and Decepticons who never got the memo about peace.',
    color: '#f9a825',
    accent: '#37474f',
    cardIdMin: 500,
    cardIdMax: 599,
  },
];

export function getExpansion(idOrCode) {
  return EXPANSIONS.find((e) => e.id === idOrCode || e.code === idOrCode);
}

export function expansionForCardId(id) {
  return EXPANSIONS.find((e) => id >= e.cardIdMin && id <= e.cardIdMax);
}
