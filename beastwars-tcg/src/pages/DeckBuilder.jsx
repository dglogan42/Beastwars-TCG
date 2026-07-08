import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CARDS,
  DECK_SIZE,
  FACTIONS,
  EXPANSIONS,
  getCard,
  defaultDeck,
} from '../data/cards';
import { useDeck } from '../context/DeckContext';
import { TradingCard } from '../components/TradingCard';
import './pages.css';

const PRESETS = [
  { key: 'Maximal', label: 'Maximals' },
  { key: 'Predacon', label: 'Predacons' },
  { key: 'Autobot', label: 'Autobots' },
  { key: 'Decepticon', label: 'Decepticons' },
  { key: 'Vehicon', label: 'Vehicons' },
  { key: 'BW01', label: 'Set BW01' },
  { key: 'G1A', label: 'Set G1A' },
  { key: 'G1D', label: 'Set G1D' },
  { key: 'BM01', label: 'Set BM01' },
  { key: 'ARM01', label: 'Set ARM01' },
  { key: 'ANI01', label: 'Set ANI01' },
];

export function DeckBuilder() {
  const { deckIds, toggleCard, setDeckIds } = useDeck();
  const [setFilter, setSetFilter] = useState('all');
  const [faction, setFaction] = useState('all');

  const pool = useMemo(() => {
    return CARDS.filter((c) => {
      if (setFilter !== 'all' && c.set !== setFilter) return false;
      if (faction !== 'all' && c.faction !== faction) return false;
      return true;
    });
  }, [setFilter, faction]);

  const inDeck = deckIds.map((id) => getCard(id)).filter(Boolean);
  const totalCost = inDeck.reduce((s, c) => s + c.cost, 0);
  const avgCost = inDeck.length ? (totalCost / inDeck.length).toFixed(1) : '—';
  const full = deckIds.length >= DECK_SIZE;

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Strike Team Assembly</p>
          <h2>Deck Builder</h2>
          <p className="sub">
            Choose exactly {DECK_SIZE} unique fighters from {CARDS.length} cards across{' '}
            {EXPANSIONS.length} expansions. Deck is saved in this browser.
          </p>
        </div>
        <div className="page-header__actions">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              className="btn btn--ghost"
              onClick={() => setDeckIds(defaultDeck(p.key))}
            >
              {p.label}
            </button>
          ))}
          <button type="button" className="btn btn--ghost" onClick={() => setDeckIds([])}>
            Clear
          </button>
          <Link className={`btn btn--primary ${full ? '' : 'is-disabled'}`} to={full ? '/battle' : '#'}>
            Battle with deck
          </Link>
        </div>
      </header>

      <div className="deck-status">
        <div>
          <span className="deck-status__count">
            {deckIds.length}/{DECK_SIZE}
          </span>
          <span>cards selected</span>
        </div>
        <div>
          Avg cost <strong>{avgCost}</strong>
        </div>
        <div>
          Total cost <strong>{totalCost}</strong>
        </div>
        <div className="deck-status__pips">
          {Array.from({ length: DECK_SIZE }).map((_, i) => (
            <i key={i} className={i < deckIds.length ? 'is-on' : ''} />
          ))}
        </div>
      </div>

      {inDeck.length > 0 && (
        <section className="section">
          <h3>Your deck</h3>
          <div className="card-row">
            {inDeck.map((c) => (
              <TradingCard
                key={c.id}
                card={c}
                size="sm"
                interactive
                selected
                onClick={() => toggleCard(c.id)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <h3>Card pool</h3>
        <div className="toolbar" style={{ marginBottom: 12 }}>
          <div className="chip-row">
            <button
              type="button"
              className={`chip ${setFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setSetFilter('all')}
            >
              All sets
            </button>
            {EXPANSIONS.map((e) => (
              <button
                key={e.code}
                type="button"
                className={`chip ${setFilter === e.code ? 'is-active' : ''}`}
                style={setFilter === e.code ? { background: e.color } : undefined}
                onClick={() => setSetFilter(e.code)}
              >
                {e.code}
              </button>
            ))}
          </div>
          <div className="chip-row">
            <button
              type="button"
              className={`chip ${faction === 'all' ? 'is-active' : ''}`}
              onClick={() => setFaction('all')}
            >
              All factions
            </button>
            {Object.keys(FACTIONS).map((f) => (
              <button
                key={f}
                type="button"
                className={`chip ${faction === f ? 'is-active' : ''}`}
                style={faction === f ? { background: FACTIONS[f].color } : undefined}
                onClick={() => setFaction(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <p className="hint">
          Showing {pool.length} cards — click to add or remove from your deck.
        </p>
        <div className="card-grid">
          {pool.map((c) => {
            const selected = deckIds.includes(c.id);
            const lockedOut = full && !selected;
            return (
              <TradingCard
                key={c.id}
                card={c}
                size="md"
                interactive
                selected={selected}
                dimmed={lockedOut}
                onClick={() => {
                  if (lockedOut) return;
                  toggleCard(c.id);
                }}
              />
            );
          })}
        </div>
      </section>

      <div className="faction-legend">
        {Object.entries(FACTIONS).map(([name, f]) => (
          <span key={name} style={{ borderColor: f.color }}>
            <i style={{ background: f.color }} /> {name}
          </span>
        ))}
      </div>
    </div>
  );
}
