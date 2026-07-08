import { Link } from 'react-router-dom';
import { CARDS, DECK_SIZE, FACTIONS, getCard } from '../data/cards';
import { useDeck } from '../context/DeckContext';
import { TradingCard } from '../components/TradingCard';
import './pages.css';

export function DeckBuilder() {
  const { deckIds, toggleCard, resetDeck, setDeckIds } = useDeck();

  const inDeck = deckIds.map((id) => getCard(id));
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
            Choose exactly {DECK_SIZE} unique fighters. Deck is saved in this browser.
          </p>
        </div>
        <div className="page-header__actions">
          <button type="button" className="btn btn--ghost" onClick={() => resetDeck('Maximal')}>
            Maximals preset
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => resetDeck('Predacon')}>
            Predacons preset
          </button>
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
        <p className="hint">Click a card to add or remove it from your deck.</p>
        <div className="card-grid">
          {CARDS.map((c) => {
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
