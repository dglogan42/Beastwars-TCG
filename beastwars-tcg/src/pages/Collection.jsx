import { useMemo, useState } from 'react';
import { CARDS, FACTIONS, RARITIES, EXPANSIONS, getExpansion } from '../data/cards';
import { TradingCard } from '../components/TradingCard';
import './pages.css';

export function Collection() {
  const [faction, setFaction] = useState('all');
  const [setFilter, setSetFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CARDS.filter((c) => {
      if (faction !== 'all' && c.faction !== faction) return false;
      if (setFilter !== 'all' && c.set !== setFilter) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.beast.toLowerCase().includes(q) ||
        (c.altMode && c.altMode.toLowerCase().includes(q)) ||
        c.ability.toLowerCase().includes(q) ||
        c.species.toLowerCase().includes(q) ||
        c.set.toLowerCase().includes(q) ||
        c.types.some((t) => t.includes(q))
      );
    });
  }, [faction, setFilter, query]);

  const detail = selected ? CARDS.find((c) => c.id === selected) : null;
  const detailExp = detail ? getExpansion(detail.set) : null;

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Expansion Libraries</p>
          <h2>Card Collection</h2>
          <p className="sub">
            {CARDS.length} fighters across {EXPANSIONS.length} expansion sets — Beast Wars, G1,
            Beast Machines, Armada, and Animated.
          </p>
        </div>
      </header>

      <div className="expansion-strip">
        <button
          type="button"
          className={`exp-chip ${setFilter === 'all' ? 'is-active' : ''}`}
          onClick={() => setSetFilter('all')}
        >
          All sets ({CARDS.length})
        </button>
        {EXPANSIONS.map((e) => {
          const n = CARDS.filter((c) => c.set === e.code).length;
          return (
            <button
              key={e.code}
              type="button"
              className={`exp-chip ${setFilter === e.code ? 'is-active' : ''}`}
              style={
                setFilter === e.code
                  ? { background: e.color, borderColor: e.color, color: '#fff' }
                  : { borderColor: e.color }
              }
              onClick={() => setSetFilter(e.code)}
              title={e.description}
            >
              <strong>{e.code}</strong> {e.shortName}
              <span className="exp-chip__count">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="toolbar">
        <input
          className="input"
          type="search"
          placeholder="Search name, alt mode, ability, set code…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
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

      <p className="result-meta">
        Showing <strong>{list.length}</strong> cards
        {setFilter !== 'all' ? ` in ${setFilter}` : ''}
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
                    <dt>Expansion</dt>
                    <dd>
                      {detailExp ? `${detailExp.code} — ${detailExp.name}` : detail.set}
                    </dd>
                  </div>
                  <div>
                    <dt>Alt mode</dt>
                    <dd>
                      {detail.species} · {detail.altMode || detail.beast}
                    </dd>
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
