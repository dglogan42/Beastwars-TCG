import { Link } from 'react-router-dom';
import {
  siteSections,
  featuredCards,
  pageMeta,
  tokens,
} from '../data/tcgl';
import { CARDS, EXPANSIONS, expansionStats } from '../data/cards';
import { TradingCard } from '../components/TradingCard';
import { asset } from '../utils/assets';
import './pages.css';
import './home-tcgl.css';

export function Home() {
  const { about, gameModes, battlePass, collection, getStarted, systemRequirements } =
    siteSections;
  const featuredBw = [1, 11, 100, 200, 300, 400, 500, 114]
    .map((id) => CARDS.find((c) => c.id === id))
    .filter(Boolean);
  const setStats = expansionStats();

  return (
    <div className="page-home">
      {/* Hero — mirrors TCGL header blade */}
      <section className="tcgl-hero">
        <div
          className="tcgl-hero__bg"
          style={{ backgroundImage: `url(${asset('tcgl/header-fallback-medium.jpg')})` }}
        />
        <div className="tcgl-hero__shade" />
        <div className="tcgl-hero__content">
          <p className="tcgl-hero__eyebrow">Cross-platform web app</p>
          <h1>Beast Wars TCG Live</h1>
          <p className="tcgl-hero__lede">
            Play in the browser on Mac, Windows, Linux, iPhone, iPad, and Android. Install to your
            home screen for a full-screen app experience — no store required.
          </p>
          <div className="tcgl-hero__actions">
            <Link className="btn-tcgl btn-tcgl--red" to="/battle">
              Play Now
            </Link>
            <Link className="btn-tcgl btn-tcgl--white" to="/deck">
              Build Deck
            </Link>
          </div>
          <p className="tcgl-hero__meta">
            PWA · offline-ready · {CARDS.length} cards · design tokens:{' '}
            {Object.keys(tokens).length} · {pageMeta.trackingPageType}
          </p>
        </div>
        <div className="tcgl-hero__cards">
          {featuredCards.slice(0, 3).map((c) => (
            <img key={c.id} src={asset(c.image)} alt={`${c.setCode} #${c.number}`} />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="tcgl-section tcgl-section--about pattern-halftone" id={about.id}>
        <div className="tcgl-wrap txt-center">
          <h2 className="tcgl-h">{about.heading}</h2>
          <p className="tcgl-body">{about.body}</p>
          <div className="angled-grid">
            <article className="angled-box">
              <div className="angled-box__inner">
                <h3>Standard format</h3>
                <p>
                  {CARDS.length} fighters · {EXPANSIONS.length} expansion sets
                </p>
              </div>
            </article>
            <article className="angled-box">
              <div className="angled-box__inner">
                <h3>Learning Lab</h3>
                <p>Ability text, stats, and spark flavor on every card</p>
              </div>
            </article>
            <article className="angled-box">
              <div className="angled-box__inner">
                <h3>Starter decks</h3>
                <p>Maximal &amp; Predacon presets in Deck Builder</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <section className="tcgl-section tcgl-section--modes pattern-hex" id={gameModes.id}>
        <div className="tcgl-wrap txt-center">
          <h2 className="tcgl-h tcgl-h--light">{gameModes.heading}</h2>
          <p className="tcgl-body tcgl-body--light">{gameModes.intro}</p>
          <div className="mode-grid">
            {gameModes.modes.map((mode) => (
              <Link key={mode.id} to={mode.route} className="mode-card">
                <span className="mode-card__icon" aria-hidden />
                <h3>{mode.name}</h3>
                <p>{mode.description}</p>
                <span className="mode-card__cta">Play →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Battle Pass */}
      <section
        className="tcgl-section tcgl-section--pass pattern-hex"
        id={battlePass.id}
        style={{ '--pass-hex': `url(${asset('tcgl/hexagon-grey.png')})` }}
      >
        <div className="tcgl-wrap tcgl-split">
          <div>
            <h2 className="tcgl-h">{battlePass.heading}</h2>
            <p className="tcgl-body">{battlePass.body}</p>
            <Link className="btn-tcgl btn-tcgl--red" to={battlePass.cta.route}>
              {battlePass.cta.label}
            </Link>
          </div>
          <div className="pass-art">
            {battlePass.images.map((src) => (
              <img key={src} src={asset(src)} alt="" />
            ))}
          </div>
        </div>
      </section>

      {/* Collection / featured TCGL cards + BW cards */}
      <section className="tcgl-section tcgl-section--collection pattern-halftone" id={collection.id}>
        <div className="tcgl-wrap txt-center">
          <h2 className="tcgl-h tcgl-h--light">{collection.heading}</h2>
          <p className="tcgl-body tcgl-body--light">{collection.body}</p>

          <h3 className="tcgl-subhead tcgl-h--light">Featured gallery assets (from TCG Live page)</h3>
          <div className="tcgl-card-gallery">
            {featuredCards.map((c) => (
              <figure key={c.id} className="tcgl-gallery-card">
                <img src={asset(c.image)} alt={`${c.setCode} English #${c.number}`} />
                <figcaption>
                  {c.setCode} · #{c.number}
                </figcaption>
              </figure>
            ))}
          </div>

          <h3 className="tcgl-subhead tcgl-h--light">Beastdex playable cards</h3>
          <div className="card-row card-row--center">
            {featuredBw.map((c) => (
              <TradingCard key={c.id} card={c} size="md" />
            ))}
          </div>
          <div style={{ marginTop: 20 }}>
            <Link className="btn-tcgl btn-tcgl--white" to={collection.cta.route}>
              {collection.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Transformers expansion libraries */}
      <section className="tcgl-section tcgl-section--expansions" id="expansions">
        <div className="tcgl-wrap">
          <h2 className="tcgl-h">Expansion Sets</h2>
          <p className="tcgl-body">
            Full character libraries from across Transformers continuity — each set is legal for
            constructed decks and filterable in Collection.
          </p>
          <ul className="expansion-list">
            {setStats.map((e) => (
              <li key={e.code} style={{ borderLeftColor: e.color }}>
                <strong>
                  {e.code} · {e.name}
                </strong>
                <br />
                <span style={{ fontSize: '0.85rem', color: '#666' }}>
                  {e.count} cards · {e.era} ({e.year}) · {e.legendaries} legendary
                </span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Link className="btn-tcgl btn-tcgl--red" to="/collection">
              Browse all libraries
            </Link>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="tcgl-section tcgl-section--start pattern-halftone" id={getStarted.id}>
        <div className="tcgl-wrap txt-center">
          <h2 className="tcgl-h tcgl-h--light">{getStarted.heading}</h2>
          <p className="tcgl-body tcgl-body--light">{getStarted.body}</p>
          <ol className="start-steps">
            {getStarted.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <Link className="btn-tcgl btn-tcgl--red" to={getStarted.cta.route}>
            {getStarted.cta.label}
          </Link>
        </div>
      </section>

      {/* System requirements */}
      <section
        className="tcgl-section tcgl-section--sys"
        id={systemRequirements.id}
      >
        <div className="tcgl-wrap">
          <h2 className="tcgl-h">{systemRequirements.heading}</h2>
          <div className="platform-tabs">
            {systemRequirements.platforms.map((p) => (
              <span key={p} className={p === 'WINDOWS' ? 'is-active' : ''}>
                {p}
              </span>
            ))}
          </div>
          <div className="sys-table-wrap">
            <table className="sys-table">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Minimum Requirements</th>
                  <th>Recommended Specifications</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(systemRequirements.windows.minimum).map(([key]) => (
                  <tr key={key}>
                    <td>{labelize(key)}</td>
                    <td>{systemRequirements.windows.minimum[key]}</td>
                    <td>{systemRequirements.windows.recommended[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tcgl-caption">
            Table structure and Windows specs taken from the saved TCG Live System Requirements
            section.
          </p>
        </div>
      </section>
    </div>
  );
}

function labelize(key) {
  const map = {
    os: 'Operating System',
    processor: 'Processor',
    memory: 'Memory',
    storage: 'Storage',
  };
  return map[key] || key;
}
