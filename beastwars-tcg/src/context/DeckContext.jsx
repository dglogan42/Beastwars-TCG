import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DECK_SIZE, defaultDeck } from '../data/cards';

const STORAGE_KEY = 'bw-tcg-deck-v1';
const DeckContext = createContext(null);

export function DeckProvider({ children }) {
  const [deckIds, setDeckIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length === DECK_SIZE) return parsed;
      }
    } catch {
      /* ignore */
    }
    return defaultDeck('Maximal');
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deckIds));
  }, [deckIds]);

  const value = useMemo(
    () => ({
      deckIds,
      setDeckIds,
      resetDeck: (faction = 'Maximal') => setDeckIds(defaultDeck(faction)),
      toggleCard: (id) => {
        setDeckIds((prev) => {
          if (prev.includes(id)) return prev.filter((x) => x !== id);
          if (prev.length >= DECK_SIZE) return prev;
          return [...prev, id];
        });
      },
    }),
    [deckIds]
  );

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}

export function useDeck() {
  const ctx = useContext(DeckContext);
  if (!ctx) throw new Error('useDeck must be used within DeckProvider');
  return ctx;
}
