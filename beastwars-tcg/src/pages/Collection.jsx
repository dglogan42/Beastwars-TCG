import { useMemo, useState } from 'react';
import { CARDS, FACTIONS, RARITIES } from '../data/cards';
import { TradingCard } from '../components/TradingCard';
import './pages.css';

export function Collection() {
  const [faction, setFaction] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CARDS.filter((c) => {
      if (faction !== 'all' && c.faction !== faction) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.beast.toLowerCase().includes(q) ||
        c.ability.toLowerCase().includes(q) ||
        c.types.some((t) => t.includes(q))
      );
    });
  }, [faction, query]);

  const detail = selected ? CARDS.find((c) => c.id === selected) : null;

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Beastdex Archive</p>
          <h2>Card Collection</h2>
          <p className="sub">All {CARDS.length} Beast Wars fighters as collectible battle cards.</p>
        </div>
      </header>

      <div className="toolbar">
        <input
          className="input"
          type="search"
          placeholder="Search name, beast, ability…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chip-row">
          <button
            type="button"
            className={`chip ${faction === 'all' ? 'is-active' : ''}`}
            onClick={() => setFaction('all')}
          >
            All
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

      <p className="result-meta">
        Showing <strong>{list.length}</strong> cards
      </p>

      <div className="collection-layout">
        <div className="card-grid">
          {list.map((c) => (
            <TradingCard
              key={c.id}
              card={c}
              size="md"
              interactive
              selected={selected === c.id}
              onClick={() => setSelected(c.id)}
            />
          ))}
        </div>

        <aside className={`detail-panel ${detail ? 'is-open' : ''}`}>
          {detail ? (
            <>
              <TradingCard card={detail} size="lg" />
              <div className="detail-panel__body">
                <p className="flavor">&ldquo;{detail.flavor}&rdquo;</p>
                <dl className="detail-dl">
                  <div>
                    <dt>Species</dt>
                    <dd>{detail.species} · {detail.beast} mode</dd>
                  </div>
                  <div>
                    <dt>Rarity</dt>
                    <dd style={{ color: RARITIES[detail.rarity].color }}>
                      {RARITIES[detail.rarity].label} {'★'.repeat(RARITIES[detail.rarity].stars)}
                    </dd>
                  </div>
                  <div>
                    <dt>Energon Cost</dt>
                    <dd>{detail.cost}</dd>
                  </div>
                  <div>
                    <dt>Ability</dt>
                    <dd>
                      <strong>{detail.ability}</strong> — {detail.abilityText}
                    </dd>
                  </div>
                </dl>
                <button type="button" className="btn btn--ghost" onClick={() => setSelected(null)}>
                  Close
                </button>
              </div>
            </>
          ) : (
            <p className="detail-panel__empty">Select a card to inspect its spark data.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
