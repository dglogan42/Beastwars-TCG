import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DECK_SIZE, getCard, aiDeck } from '../data/cards';
import { useDeck } from '../context/DeckContext';
import {
  createBattle,
  playFromHand,
  attack,
  retreat,
  endTurn,
  promoteFromBench,
  useVokPower,
  validateDeck,
} from '../game/engine';
import { TradingCard, MiniFighter } from '../components/TradingCard';
import './pages.css';

export function Battle() {
  const { deckIds } = useDeck();
  const validation = validateDeck(deckIds);

  const [battle, setBattle] = useState(null);
  const [selectedBench, setSelectedBench] = useState(null);

  const start = useCallback(() => {
    if (!validation.ok) return;
    setBattle(createBattle(deckIds, aiDeck()));
    setSelectedBench(null);
  }, [deckIds, validation.ok]);

  const act = useCallback((fn) => {
    setBattle((b) => (b ? fn(b) : b));
  }, []);

  const player = battle?.player;
  const enemy = battle?.enemy;

  const canAttack = useMemo(() => {
    if (!battle || battle.phase === 'gameover' || battle.turn !== 'player') return false;
    if (!player?.active || !enemy?.active || player.hasAttacked) return false;
    if (player.active.stunned) return false;
    const def = getCard(player.active.cardId);
    if (def.ability === 'Friend Guard') return false;
    return true;
  }, [battle, player, enemy]);

  const hasVok =
    player?.active &&
    getCard(player.active.cardId).ability === 'Vok Power' &&
    !player.active.vokUsed;

  if (!battle) {
    return (
      <div className="page">
        <header className="page-header">
          <div>
            <p className="eyebrow">Combat Protocol</p>
            <h2>Battle Arena</h2>
            <p className="sub">You vs Predacon AI · best of one spark war</p>
          </div>
        </header>

        <div className="prebattle">
          <div className="prebattle__panel">
            <h3>Your deck ({deckIds.length}/{DECK_SIZE})</h3>
            {!validation.ok ? (
              <p className="error">{validation.error}</p>
            ) : (
              <div className="card-row">
                {deckIds.map((id) => (
                  <TradingCard key={id} cardId={id} size="sm" />
                ))}
              </div>
            )}
            <div className="hero__actions" style={{ marginTop: 16 }}>
              <button
                type="button"
                className="btn btn--primary"
                disabled={!validation.ok}
                onClick={start}
              >
                Launch Beast Wars
              </button>
              <Link className="btn btn--ghost" to="/deck">
                Edit deck
              </Link>
            </div>
          </div>
          <div className="prebattle__panel prebattle__panel--ai">
            <h3>Opponent</h3>
            <p>Predacon AI builds a random 6-card Predacon strike force (Megatron preferred).</p>
            <ul className="rules-list">
              <li>Start with 3 cards; first becomes active automatically</li>
              <li>Gain 1 Energon per turn (max 5)</li>
              <li>Play fighters to active or bench (max 2 bench)</li>
              <li>Attack once per turn · Retreat for 1 Energon</li>
              <li>Wipe the enemy roster to win</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page battle-page">
      <div className="battle-top">
        <div>
          <p className="eyebrow">Turn {battle.turnNumber}</p>
          <h2>{battle.phase === 'gameover' ? (battle.winner === 'player' ? 'Victory!' : 'Defeat') : battle.turn === 'player' ? 'Your turn' : 'Enemy turn…'}</h2>
        </div>
        <div className="energon-display" title="Energon">
          <span>Energon</span>
          <strong>{player.energon}</strong>
          <div className="energon-pips">
            {Array.from({ length: 5 }).map((_, i) => (
              <i key={i} className={i < player.energon ? 'is-on' : ''} />
            ))}
          </div>
        </div>
        <div className="battle-top__actions">
          <button type="button" className="btn btn--ghost" onClick={start}>
            Rematch
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setBattle(null);
            }}
          >
            Leave
          </button>
        </div>
      </div>

      {battle.phase === 'gameover' && (
        <div className={`banner-win ${battle.winner === 'player' ? 'is-win' : 'is-loss'}`}>
          {battle.winner === 'player'
            ? 'The Maximals secure prehistoric Earth!'
            : 'The Predacons claim the energon caches…'}
          <button type="button" className="btn btn--primary" onClick={start}>
            Play again
          </button>
        </div>
      )}

      <div className="battlefield">
        {/* Enemy */}
        <section className="field-side field-side--enemy">
          <div className="field-side__meta">
            <h3>Predacon AI</h3>
            <span>
              Deck {enemy.deck.length} · Hand {enemy.hand.length} · Discard {enemy.discard.length} ·
              Energon {enemy.energon}
            </span>
          </div>
          <div className="field-row">
            <div className="bench-col">
              <p className="col-label">Bench</p>
              {enemy.bench.length === 0 && <MiniFighter fighter={null} label="Empty" />}
              {enemy.bench.map((f) => (
                <MiniFighter key={f.uid} fighter={f} />
              ))}
            </div>
            <div className="active-col">
              <p className="col-label">Active</p>
              {enemy.active ? (
                <TradingCard
                  cardId={enemy.active.cardId}
                  size="md"
                  damaged={enemy.active.hp}
                  maxHp={enemy.active.maxHp}
                />
              ) : (
                <div className="empty-active">No active fighter</div>
              )}
            </div>
            <div className="hand-col hand-col--hidden">
              <p className="col-label">Hand</p>
              <div className="hand-backs">
                {enemy.hand.map((f) => (
                  <TradingCard key={f.uid} size="sm" faceDown />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="field-divider">
          <span>⚡ ENERGON STORM ⚡</span>
        </div>

        {/* Player */}
        <section className="field-side field-side--player">
          <div className="field-row">
            <div className="bench-col">
              <p className="col-label">Bench (click + Retreat)</p>
              {player.bench.length === 0 && <MiniFighter fighter={null} label="Empty" />}
              {player.bench.map((f, i) => (
                <MiniFighter
                  key={f.uid}
                  fighter={f}
                  selected={selectedBench === i}
                  onClick={() => setSelectedBench(selectedBench === i ? null : i)}
                />
              ))}
            </div>
            <div className="active-col">
              <p className="col-label">Active</p>
              {player.active ? (
                <TradingCard
                  cardId={player.active.cardId}
                  size="md"
                  damaged={player.active.hp}
                  maxHp={player.active.maxHp}
                />
              ) : (
                <div className="empty-active">Play a card as active!</div>
              )}
            </div>
            <div className="actions-col">
              <p className="col-label">Actions</p>
              <button
                type="button"
                className="btn btn--danger"
                disabled={!canAttack}
                onClick={() => act(attack)}
              >
                Attack
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                disabled={
                  battle.phase === 'gameover' ||
                  battle.turn !== 'player' ||
                  selectedBench == null ||
                  !player.active ||
                  player.hasRetreated ||
                  player.energon < 1
                }
                onClick={() => {
                  act((b) => retreat(b, selectedBench));
                  setSelectedBench(null);
                }}
              >
                Retreat (1⚡)
              </button>
              {!player.active && player.bench.length > 0 && (
                <button
                  type="button"
                  className="btn btn--ghost"
                  disabled={selectedBench == null}
                  onClick={() => {
                    act((b) => promoteFromBench(b, selectedBench ?? 0));
                    setSelectedBench(null);
                  }}
                >
                  Promote bench
                </button>
              )}
              {hasVok && (
                <button
                  type="button"
                  className="btn btn--accent"
                  disabled={battle.turn !== 'player'}
                  onClick={() => act(useVokPower)}
                >
                  Vok Power
                </button>
              )}
              <button
                type="button"
                className="btn btn--primary"
                disabled={battle.phase === 'gameover' || battle.turn !== 'player'}
                onClick={() => act(endTurn)}
              >
                End turn
              </button>
            </div>
          </div>

          <div className="player-hand">
            <p className="col-label">
              Your hand — click to play (need Energon · bench max 2)
            </p>
            <div className="card-row">
              {player.hand.map((f, i) => {
                const def = getCard(f.cardId);
                const canPlay =
                  battle.turn === 'player' &&
                  battle.phase !== 'gameover' &&
                  player.energon >= def.cost &&
                  ( !player.active || player.bench.length < 2);
                return (
                  <TradingCard
                    key={f.uid}
                    cardId={f.cardId}
                    size="sm"
                    interactive={canPlay}
                    dimmed={!canPlay}
                    onClick={() => {
                      if (!canPlay) return;
                      act((b) => playFromHand(b, i));
                    }}
                  />
                );
              })}
              {player.hand.length === 0 && <p className="hint">Hand empty — draw each turn.</p>}
            </div>
            <p className="hint">
              Deck: {player.deck.length} remaining · Discard: {player.discard.length}
            </p>
          </div>
        </section>
      </div>

      <aside className="battle-log">
        <h3>Combat log</h3>
        <ul>
          {battle.log.map((line, i) => (
            <li key={`${i}-${line.slice(0, 12)}`}>{line}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
