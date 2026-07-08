/** SVG beast-mode sprites shared with Beastdex aesthetic */

const paths = {
  gorilla: (
    <>
      <ellipse cx="50" cy="72" rx="28" ry="18" fill="#3d6b3d" />
      <circle cx="50" cy="42" r="24" fill="#4a8a4a" />
      <ellipse cx="50" cy="50" rx="14" ry="12" fill="#c4e0a8" />
      <circle cx="42" cy="40" r="3.5" fill="#1a1a1a" />
      <circle cx="58" cy="40" r="3.5" fill="#1a1a1a" />
      <path d="M38 56h24" stroke="#2a4a2a" strokeWidth="2" />
      <path d="M22 48c-8 8-10 22-6 28" stroke="#3d6b3d" strokeWidth="10" strokeLinecap="round" />
      <path d="M78 48c8 8 10 22 6 28" stroke="#3d6b3d" strokeWidth="10" strokeLinecap="round" />
    </>
  ),
  rhino: (
    <>
      <ellipse cx="48" cy="62" rx="32" ry="20" fill="#6b7a7a" />
      <ellipse cx="68" cy="48" rx="20" ry="16" fill="#7d8c8c" />
      <path d="M82 42l14-10-4 14-10 2z" fill="#c8d0d0" />
      <path d="M78 50l8-2-1 8-7 1z" fill="#a8b0b0" />
      <circle cx="74" cy="44" r="3" fill="#1a1a1a" />
      <ellipse cx="28" cy="78" rx="6" ry="8" fill="#556060" />
      <ellipse cx="48" cy="80" rx="6" ry="8" fill="#556060" />
      <ellipse cx="62" cy="80" rx="6" ry="8" fill="#556060" />
    </>
  ),
  cheetah: (
    <>
      <ellipse cx="50" cy="58" rx="30" ry="16" fill="#f0c040" />
      <ellipse cx="72" cy="46" rx="16" ry="12" fill="#f0c040" />
      <circle cx="78" cy="42" r="3" fill="#1a1a1a" />
      <circle cx="40" cy="54" r="3" fill="#3a2800" />
      <circle cx="52" cy="50" r="2.5" fill="#3a2800" />
      <circle cx="58" cy="58" r="2.5" fill="#3a2800" />
      <ellipse cx="30" cy="74" rx="4" ry="8" fill="#d4a020" />
      <ellipse cx="48" cy="76" rx="4" ry="8" fill="#d4a020" />
      <ellipse cx="62" cy="74" rx="4" ry="8" fill="#d4a020" />
      <ellipse cx="74" cy="70" rx="4" ry="7" fill="#d4a020" />
    </>
  ),
  rat: (
    <>
      <path d="M20 70c20-30 50-30 70 0" stroke="#c45c40" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="48" cy="52" rx="22" ry="16" fill="#8a8a8a" />
      <ellipse cx="66" cy="42" rx="14" ry="12" fill="#9a9a9a" />
      <circle cx="72" cy="38" r="2.5" fill="#1a1a1a" />
      <ellipse cx="38" cy="38" rx="8" ry="10" fill="#b0b0b0" />
      <ellipse cx="58" cy="34" rx="7" ry="9" fill="#b0b0b0" />
    </>
  ),
  raptor: (
    <>
      <path d="M30 70c8-20 28-28 48-18l8 8c-4 10-16 18-32 20-12 2-20-2-24-10z" fill="#8b5a2b" />
      <path d="M70 48c10-4 18-2 22 6l-8 6c-4-4-10-6-14-4z" fill="#a06a35" />
      <path d="M78 52l12-2-2 6-8 2z" fill="#e8d0a0" />
      <circle cx="82" cy="50" r="2.5" fill="#1a1a1a" />
      <path d="M36 72l-6 18M48 74l0 18M58 72l4 16" stroke="#6a4020" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  tiger: (
    <>
      <ellipse cx="50" cy="58" rx="28" ry="16" fill="#f0a020" />
      <ellipse cx="70" cy="46" rx="16" ry="13" fill="#f0a020" />
      <path d="M42 48v16M52 46v18M60 50v14M68 42v14" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
      <circle cx="76" cy="42" r="3" fill="#1a1a1a" />
      <ellipse cx="34" cy="74" rx="5" ry="8" fill="#d08010" />
      <ellipse cx="50" cy="76" rx="5" ry="8" fill="#d08010" />
      <ellipse cx="62" cy="74" rx="5" ry="8" fill="#d08010" />
    </>
  ),
  falcon: (
    <>
      <path d="M18 55c20-18 44-18 64 0-8 4-20 8-32 8s-24-4-32-8z" fill="#c47840" />
      <ellipse cx="50" cy="48" rx="14" ry="18" fill="#e8a060" />
      <circle cx="46" cy="44" r="2.5" fill="#1a1a1a" />
      <circle cx="54" cy="44" r="2.5" fill="#1a1a1a" />
      <path d="M48 52h4l-2 8z" fill="#f0a020" />
      <path d="M42 66l8 18 8-18" fill="#a06030" />
    </>
  ),
  wolfeagle: (
    <>
      <path d="M12 58c22-22 54-22 76 0-10 6-24 10-38 10S22 64 12 58z" fill="#d0d8e8" />
      <ellipse cx="50" cy="52" rx="18" ry="16" fill="#e8ecf4" />
      <circle cx="44" cy="48" r="3" fill="#1a1a1a" />
      <circle cx="56" cy="48" r="3" fill="#1a1a1a" />
      <path d="M48 54h4l-2 6z" fill="#f0a040" />
      <path d="M30 36l-12-8 4 12M70 36l12-8-4 12" fill="#a8b4cc" />
    </>
  ),
  manta: (
    <>
      <path d="M50 28c-28 8-40 28-38 40 16-4 28-2 38 8 10-10 22-12 38-8 2-12-10-32-38-40z" fill="#2a5a8a" />
      <path d="M50 36c-18 6-26 20-24 30 10-2 18 0 24 6 6-6 14-8 24-6 2-10-6-24-24-30z" fill="#3a7ab0" />
      <circle cx="42" cy="48" r="3" fill="#78dcff" />
      <circle cx="58" cy="48" r="3" fill="#78dcff" />
    </>
  ),
  tigerhawk: (
    <>
      <path d="M10 55c24-20 56-20 80 0-12 8-28 12-40 12S22 63 10 55z" fill="#e8c860" />
      <ellipse cx="50" cy="50" rx="16" ry="14" fill="#f0d070" />
      <path d="M42 44v10M50 42v12M58 44v10" stroke="#3a2800" strokeWidth="2.5" />
      <circle cx="44" cy="48" r="2.5" fill="#1a1a1a" />
      <circle cx="56" cy="48" r="2.5" fill="#1a1a1a" />
      <path d="M28 40l-14-10 6 14M72 40l14-10-6 14" fill="#d4b040" />
    </>
  ),
  trex: (
    <>
      <path d="M28 62c10-18 30-24 48-12 4 8 2 18-6 24-16 8-32 6-42-4z" fill="#5a3060" />
      <path d="M68 46c10-2 18 2 22 10l-10 4c-2-4-6-6-12-6z" fill="#7a4080" />
      <path d="M78 52l12 0-2 6-10 0z" fill="#c0a0c8" />
      <circle cx="84" cy="50" r="2.5" fill="#f0e040" />
      <path d="M36 72l-4 16M48 74l2 16M58 72l6 14" stroke="#3a1840" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  scorpion: (
    <>
      <ellipse cx="48" cy="58" rx="22" ry="14" fill="#c47020" />
      <path d="M66 50c12-16 18-8 14 8-8 4-12 4-14 0z" fill="#d88830" />
      <path d="M78 42l10-14-2 12z" fill="#e8a040" />
      <circle cx="82" cy="34" r="4" fill="#a03030" />
      <circle cx="40" cy="52" r="3" fill="#1a1a1a" />
      <circle cx="54" cy="52" r="3" fill="#1a1a1a" />
    </>
  ),
  pteranodon: (
    <>
      <path d="M8 52c28-24 56-24 84 0-16 6-36 10-42 10S24 58 8 52z" fill="#c04040" />
      <ellipse cx="50" cy="52" rx="12" ry="14" fill="#e06050" />
      <circle cx="48" cy="48" r="2.5" fill="#1a1a1a" />
      <path d="M54 52h10l-2 4h-8z" fill="#f0c060" />
      <path d="M42 66l8 14 8-14" fill="#a03030" />
    </>
  ),
  spider: (
    <>
      <circle cx="50" cy="52" r="16" fill="#2a2a3a" />
      <circle cx="50" cy="52" r="10" fill="#3a3a50" />
      <path d="M34 44L14 28M34 52L12 52M34 60L14 76M66 44L86 28M66 52L88 52M66 60L86 76" stroke="#2a2a3a" strokeWidth="4" strokeLinecap="round" />
      <circle cx="44" cy="48" r="2.5" fill="#f04040" />
      <circle cx="56" cy="48" r="2.5" fill="#f04040" />
    </>
  ),
  wasp: (
    <>
      <ellipse cx="50" cy="58" rx="14" ry="18" fill="#f0d020" />
      <path d="M40 48h20M40 56h20M40 64h20" stroke="#1a1a1a" strokeWidth="3" />
      <circle cx="50" cy="36" r="12" fill="#f0d020" />
      <circle cx="46" cy="34" r="2.5" fill="#1a1a1a" />
      <circle cx="54" cy="34" r="2.5" fill="#1a1a1a" />
      <path d="M28 40c-12-8-16 0-12 12 8 0 12-4 12-12z" fill="#c0e0f0" opacity="0.8" />
      <path d="M72 40c12-8 16 0 12 12-8 0-12-4-12-12z" fill="#c0e0f0" opacity="0.8" />
    </>
  ),
  blackwidow: (
    <>
      <circle cx="50" cy="54" r="18" fill="#1a1a1a" />
      <circle cx="50" cy="38" r="10" fill="#2a2a2a" />
      <path d="M32 44L12 28M30 54L10 54M32 64L12 80M68 44L88 28M70 54L90 54M68 64L88 80" stroke="#1a1a1a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M44 52l6 8 6-8-6 3z" fill="#e02020" />
      <circle cx="46" cy="36" r="2" fill="#e04040" />
      <circle cx="54" cy="36" r="2" fill="#e04040" />
    </>
  ),
  ant: (
    <>
      <ellipse cx="50" cy="68" rx="16" ry="14" fill="#c03020" />
      <circle cx="50" cy="48" r="12" fill="#d04028" />
      <circle cx="50" cy="30" r="10" fill="#e05030" />
      <circle cx="46" cy="28" r="2" fill="#1a1a1a" />
      <circle cx="54" cy="28" r="2" fill="#1a1a1a" />
      <path d="M34 48L16 40M34 56L14 58M34 64L18 74M66 48L84 40M66 56L86 58M66 64L82 74" stroke="#a02818" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  fuzorscorp: (
    <>
      <ellipse cx="44" cy="58" rx="20" ry="14" fill="#d0c840" />
      <path d="M60 52c14-14 20-6 16 10-8 2-12 2-16-2z" fill="#c0b830" />
      <path d="M72 42l12-16 0 12z" fill="#e0d050" />
      <circle cx="78" cy="32" r="4" fill="#60a030" />
      <path d="M70 58c14 0 22 8 18 18-10 0-16-4-18-10z" fill="#80c040" />
      <circle cx="84" cy="72" r="5" fill="#60a030" />
    </>
  ),
  crab: (
    <>
      <ellipse cx="50" cy="55" rx="28" ry="18" fill="#b03040" />
      <path d="M22 48c-12-8-16 2-10 12l12-2z" fill="#c04050" />
      <path d="M78 48c12-8 16 2 10 12l-12-2z" fill="#c04050" />
      <circle cx="40" cy="50" r="4" fill="#f0e040" />
      <circle cx="60" cy="50" r="4" fill="#f0e040" />
    </>
  ),
  crystal: (
    <>
      <path d="M50 12l18 28-8 40H40l-8-40z" fill="#a0e0f0" opacity="0.9" />
      <path d="M50 12l18 28H50z" fill="#d0f0ff" />
      <path d="M50 12L32 40h18z" fill="#70c0e0" />
      <circle cx="50" cy="48" r="8" fill="#fff" opacity="0.5" />
    </>
  ),
  panther: (
    <>
      <ellipse cx="50" cy="58" rx="28" ry="15" fill="#2a2a35" />
      <ellipse cx="70" cy="48" rx="15" ry="12" fill="#323240" />
      <circle cx="76" cy="44" r="2.5" fill="#f0e040" />
      <ellipse cx="34" cy="74" rx="4" ry="8" fill="#1a1a22" />
      <ellipse cx="50" cy="76" rx="4" ry="8" fill="#1a1a22" />
      <ellipse cx="62" cy="74" rx="4" ry="8" fill="#1a1a22" />
    </>
  ),
  truck: (
    <>
      <rect x="12" y="42" width="52" height="28" rx="4" fill="#c62828" />
      <rect x="52" y="36" width="32" height="34" rx="3" fill="#e53935" />
      <rect x="58" y="42" width="18" height="12" rx="2" fill="#90caf9" />
      <circle cx="28" cy="74" r="8" fill="#212121" />
      <circle cx="68" cy="74" r="8" fill="#212121" />
      <circle cx="28" cy="74" r="3" fill="#9e9e9e" />
      <circle cx="68" cy="74" r="3" fill="#9e9e9e" />
    </>
  ),
  car: (
    <>
      <path d="M14 58h72l-8-16H28z" fill="#f9a825" />
      <path d="M30 42h36l8 12H24z" fill="#ffecb3" />
      <rect x="34" y="44" width="12" height="8" rx="1" fill="#4fc3f7" />
      <rect x="52" y="44" width="12" height="8" rx="1" fill="#4fc3f7" />
      <circle cx="28" cy="62" r="7" fill="#212121" />
      <circle cx="72" cy="62" r="7" fill="#212121" />
    </>
  ),
  van: (
    <>
      <rect x="16" y="36" width="68" height="36" rx="4" fill="#eceff1" />
      <rect x="58" y="42" width="20" height="14" rx="2" fill="#90caf9" />
      <rect x="20" y="42" width="14" height="10" rx="1" fill="#ef5350" />
      <circle cx="30" cy="74" r="7" fill="#212121" />
      <circle cx="70" cy="74" r="7" fill="#212121" />
    </>
  ),
  jeep: (
    <>
      <rect x="18" y="44" width="64" height="24" rx="3" fill="#7cb342" />
      <rect x="50" y="38" width="22" height="12" rx="2" fill="#aed581" />
      <circle cx="32" cy="70" r="8" fill="#212121" />
      <circle cx="70" cy="70" r="8" fill="#212121" />
      <path d="M22 44v-8h10" stroke="#558b2f" strokeWidth="3" fill="none" />
    </>
  ),
  jet: (
    <>
      <path d="M50 18l10 50H40z" fill="#90caf9" />
      <path d="M20 55l30-8 30 8-30 10z" fill="#42a5f5" />
      <path d="M44 68h12l4 14h-20z" fill="#1565c0" />
      <circle cx="50" cy="40" r="3" fill="#fff" />
    </>
  ),
  tank: (
    <>
      <rect x="18" y="40" width="64" height="28" rx="4" fill="#78909c" />
      <rect x="30" y="28" width="40" height="16" rx="3" fill="#546e7a" />
      <rect x="62" y="30" width="28" height="6" rx="2" fill="#37474f" />
      <circle cx="30" cy="72" r="6" fill="#263238" />
      <circle cx="50" cy="74" r="6" fill="#263238" />
      <circle cx="70" cy="72" r="6" fill="#263238" />
    </>
  ),
  gun: (
    <>
      <rect x="20" y="44" width="55" height="14" rx="3" fill="#90a4ae" />
      <rect x="68" y="40" width="18" height="22" rx="2" fill="#546e7a" />
      <rect x="14" y="48" width="12" height="8" rx="1" fill="#37474f" />
      <circle cx="40" cy="51" r="3" fill="#263238" />
    </>
  ),
  cassette: (
    <>
      <rect x="18" y="30" width="64" height="42" rx="4" fill="#1565c0" />
      <circle cx="36" cy="51" r="10" fill="#0d47a1" />
      <circle cx="64" cy="51" r="10" fill="#0d47a1" />
      <circle cx="36" cy="51" r="4" fill="#90caf9" />
      <circle cx="64" cy="51" r="4" fill="#90caf9" />
      <rect x="44" y="46" width="12" height="10" fill="#0d47a1" />
    </>
  ),
  camera: (
    <>
      <rect x="20" y="34" width="60" height="36" rx="4" fill="#607d8b" />
      <circle cx="50" cy="52" r="14" fill="#37474f" />
      <circle cx="50" cy="52" r="8" fill="#90caf9" />
      <rect x="62" y="38" width="10" height="6" fill="#ffcc80" />
    </>
  ),
  combiner: (
    <>
      <rect x="38" y="12" width="24" height="20" rx="3" fill="#66bb6a" />
      <rect x="28" y="32" width="44" height="36" rx="4" fill="#43a047" />
      <rect x="12" y="36" width="16" height="28" rx="2" fill="#2e7d32" />
      <rect x="72" y="36" width="16" height="28" rx="2" fill="#2e7d32" />
      <rect x="32" y="68" width="14" height="20" rx="2" fill="#1b5e20" />
      <rect x="54" y="68" width="14" height="20" rx="2" fill="#1b5e20" />
    </>
  ),
  shuttle: (
    <>
      <path d="M50 12l22 56H28z" fill="#e3f2fd" />
      <path d="M30 68h40l-8 16H38z" fill="#90caf9" />
      <rect x="44" y="36" width="12" height="16" rx="2" fill="#42a5f5" />
      <path d="M20 50l14 8-4 12z" fill="#1565c0" />
      <path d="M80 50l-14 8 4 12z" fill="#1565c0" />
    </>
  ),
  crane: (
    <>
      <rect x="30" y="60" width="40" height="18" rx="2" fill="#9ccc65" />
      <rect x="46" y="20" width="8" height="42" fill="#7cb342" />
      <path d="M50 22h30l-6 8H50z" fill="#558b2f" />
      <circle cx="38" cy="80" r="5" fill="#33691e" />
      <circle cx="62" cy="80" r="5" fill="#33691e" />
    </>
  ),
  loader: (
    <>
      <rect x="28" y="44" width="48" height="24" rx="3" fill="#8bc34a" />
      <path d="M16 52h16l8 12H20z" fill="#689f38" />
      <circle cx="38" cy="72" r="7" fill="#33691e" />
      <circle cx="64" cy="72" r="7" fill="#33691e" />
    </>
  ),
  bat: (
    <>
      <path d="M20 48c12-20 28-20 30-8 2-12 18-12 30 8-14 4-22 8-30 8s-16-4-30-8z" fill="#5e35b1" />
      <ellipse cx="50" cy="52" rx="12" ry="14" fill="#7e57c2" />
      <circle cx="46" cy="50" r="2" fill="#fff" />
      <circle cx="54" cy="50" r="2" fill="#fff" />
    </>
  ),
  plant: (
    <>
      <path d="M50 80V40" stroke="#2e7d32" strokeWidth="6" />
      <ellipse cx="38" cy="36" rx="14" ry="20" fill="#66bb6a" />
      <ellipse cx="62" cy="32" rx="14" ry="18" fill="#81c784" />
      <ellipse cx="50" cy="48" rx="10" ry="14" fill="#a5d6a7" />
      <circle cx="50" cy="70" r="10" fill="#5d4037" />
    </>
  ),
  dragon: (
    <>
      <path d="M24 60c12-24 40-28 56-10 4 10 0 24-14 28-18 6-36 2-42-8z" fill="#7e57c2" />
      <path d="M70 44c12-2 20 6 18 16l-12 2c0-6-4-10-10-10z" fill="#9575cd" />
      <path d="M78 52l14 2-2 6-12-2z" fill="#b39ddb" />
      <circle cx="84" cy="50" r="2.5" fill="#ffeb3b" />
      <path d="M30 70l-4 16M44 72l2 16M56 70l6 14" stroke="#4a148c" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  cycle: (
    <>
      <circle cx="30" cy="62" r="14" fill="#212121" />
      <circle cx="70" cy="62" r="14" fill="#212121" />
      <circle cx="30" cy="62" r="6" fill="#9e9e9e" />
      <circle cx="70" cy="62" r="6" fill="#9e9e9e" />
      <path d="M30 58h28l12-16h8" stroke="#ef6c00" strokeWidth="5" fill="none" />
      <path d="M42 42l8 16" stroke="#ff9800" strokeWidth="4" />
    </>
  ),
  drone: (
    <>
      <ellipse cx="50" cy="48" rx="22" ry="14" fill="#7e57c2" />
      <circle cx="50" cy="48" r="8" fill="#b39ddb" />
      <path d="M20 48h10M70 48h10" stroke="#9575cd" strokeWidth="4" />
      <circle cx="18" cy="48" r="4" fill="#e1bee7" />
      <circle cx="82" cy="48" r="4" fill="#e1bee7" />
    </>
  ),
  heli: (
    <>
      <rect x="30" y="44" width="40" height="18" rx="4" fill="#7e57c2" />
      <path d="M50 44V28" stroke="#5e35b1" strokeWidth="3" />
      <path d="M18 28h64" stroke="#b39ddb" strokeWidth="4" strokeLinecap="round" />
      <path d="M66 62h16l-4 10h-12z" fill="#4527a0" />
      <circle cx="40" cy="70" r="5" fill="#212121" />
    </>
  ),
  carrier: (
    <>
      <rect x="10" y="48" width="80" height="20" rx="3" fill="#0277bd" />
      <rect x="20" y="36" width="50" height="14" rx="2" fill="#0288d1" />
      <rect x="60" y="28" width="8" height="20" fill="#01579b" />
      <path d="M14 68h72" stroke="#01579b" strokeWidth="4" />
    </>
  ),
  minicon: (
    <>
      <circle cx="50" cy="48" r="22" fill="#ff9800" />
      <circle cx="50" cy="48" r="12" fill="#ffe0b2" />
      <rect x="42" y="40" width="6" height="6" fill="#e65100" />
      <rect x="52" y="40" width="6" height="6" fill="#e65100" />
      <path d="M44 56h12" stroke="#e65100" strokeWidth="2" />
    </>
  ),
  bomber: (
    <>
      <ellipse cx="50" cy="52" rx="28" ry="16" fill="#558b2f" />
      <path d="M22 52l-12 8 4-8-4-8z" fill="#33691e" />
      <path d="M78 52l12 8-4-8 4-8z" fill="#33691e" />
      <circle cx="58" cy="48" r="4" fill="#a5d6a7" />
    </>
  ),
  key: (
    <>
      <circle cx="40" cy="42" r="16" fill="#ec407a" />
      <circle cx="40" cy="42" r="8" fill="#f8bbd0" />
      <rect x="52" y="38" width="28" height="8" rx="2" fill="#f48fb1" />
      <rect x="70" y="46" width="6" height="12" fill="#f48fb1" />
      <rect x="62" y="46" width="6" height="8" fill="#f48fb1" />
    </>
  ),
};

export function Sprite({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {paths[name] || paths.gorilla}
    </svg>
  );
}
