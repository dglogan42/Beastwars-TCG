import { FACTIONS, RARITIES, getCard } from '../data/cards';
import { Sprite } from '../data/sprites';
import './TradingCard.css';

export function TradingCard({
  cardId,
  card,
  size = 'md',
  selected = false,
  dimmed = false,
  damaged,
  maxHp,
  showCost = true,
  onClick,
  faceDown = false,
  interactive = false,
}) {
  const def = card || getCard(cardId);
  if (faceDown) {
    return (
      <div className={`tcg-card tcg-card--${size} tcg-card--back`} onClick={onClick} role={onClick ? 'button' : undefined}>
        <div className="tcg-card__back-inner">
          <span>BW</span>
          <small>Beast Wars</small>
        </div>
      </div>
    );
  }
  if (!def) return null;

  const faction = FACTIONS[def.faction] || FACTIONS.Other;
  const rarity = RARITIES[def.rarity] || RARITIES.common;
  const hp = damaged != null ? damaged : def.hp;
  const hpMax = maxHp != null ? maxHp : def.hp;

  return (
    <article
      className={[
        'tcg-card',
        `tcg-card--${size}`,
        selected ? 'is-selected' : '',
        dimmed ? 'is-dimmed' : '',
        interactive ? 'is-interactive' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--faction': faction.color, '--faction-dark': faction.dark }}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="tcg-card__frame">
        <header className="tcg-card__header">
          <span className="tcg-card__name">{def.name}</span>
          {showCost && <span className="tcg-card__cost" title="Energon cost">{def.cost}</span>}
        </header>

        <div className="tcg-card__art" style={{ background: def.artBg }}>
          <Sprite name={def.sprite} className="tcg-card__sprite" />
          <span className="tcg-card__faction">{def.faction}</span>
          <span className="tcg-card__rarity" style={{ color: rarity.color }}>
            {'★'.repeat(rarity.stars)}
          </span>
        </div>

        <div className="tcg-card__species">
          <span>{def.beast}</span>
          <span className="tcg-card__types">
            {def.types.map((t) => (
              <em key={t}>{t}</em>
            ))}
          </span>
        </div>

        <div className="tcg-card__stats">
          <div>
            <label>HP</label>
            <strong className={damaged != null && damaged < hpMax ? 'is-hurt' : ''}>
              {hp}
              {damaged != null ? <small>/{hpMax}</small> : null}
            </strong>
          </div>
          <div>
            <label>ATK</label>
            <strong>{def.atk}</strong>
          </div>
          <div>
            <label>DEF</label>
            <strong>{def.def}</strong>
          </div>
          <div>
            <label>SPD</label>
            <strong>{def.spd}</strong>
          </div>
        </div>

        <div className="tcg-card__ability">
          <strong>{def.ability}</strong>
          <p>{def.abilityText}</p>
        </div>
      </div>
    </article>
  );
}

export function MiniFighter({ fighter, selected, onClick, label }) {
  if (!fighter) {
    return (
      <div className="mini-fighter mini-fighter--empty">
        <span>{label || 'Empty'}</span>
      </div>
    );
  }
  const def = getCard(fighter.cardId);
  const faction = FACTIONS[def.faction] || FACTIONS.Other;
  const pct = Math.max(0, Math.round((fighter.hp / fighter.maxHp) * 100));

  return (
    <button
      type="button"
      className={`mini-fighter ${selected ? 'is-selected' : ''}`}
      style={{ '--faction': faction.color }}
      onClick={onClick}
    >
      <div className="mini-fighter__art" style={{ background: def.artBg }}>
        <Sprite name={def.sprite} />
      </div>
      <div className="mini-fighter__meta">
        <strong>{def.name}</strong>
        <div className="mini-fighter__hpbar">
          <i style={{ width: `${pct}%` }} />
        </div>
        <span>
          HP {fighter.hp}/{fighter.maxHp} · ATK {def.atk + fighter.atkBonus}
          {fighter.poisoned ? ' · PSN' : ''}
          {fighter.stunned ? ' · STN' : ''}
        </span>
      </div>
    </button>
  );
}
