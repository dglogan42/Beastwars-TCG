import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { applyTcglTokens, mainNav, pageMeta, tcglSource } from '../data/tcgl';
import './Layout.css';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    applyTcglTokens();
    document.title = `Beast Wars TCG Live · from ${pageMeta.title}`;
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  return (
    <div className="app-shell" data-tracking-page-type={tcglSource.trackingPageType}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="tcgl-header">
        <div className="tcgl-header__inner">
          <Link to="/" className="tcgl-brand">
            <img src="/tcgl/tcg-logo.png" alt="" className="tcgl-brand__mark" width={40} height={40} />
            <div>
              <span className="tcgl-brand__eyebrow">Based on {pageMeta.title}</span>
              <span className="tcgl-brand__title">Beast Wars TCG Live</span>
            </div>
          </Link>

          <nav className="tcgl-nav" aria-label="Main">
            {mainNav.map((item) => (
              <NavLink
                key={item.label}
                to={item.hash ? { pathname: item.to, hash: item.hash } : item.to}
                className={({ isActive }) =>
                  isActive && !item.hash ? 'is-active' : undefined
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/battle" className="tcgl-cta">
            Play Now
          </Link>
        </div>
      </header>

      <main className="app-main" id="main">
        <Outlet />
      </main>

      <footer className="tcgl-footer">
        <div className="tcgl-footer__grid">
          <div>
            <strong>Beast Wars TCG Live</strong>
            <p>
              Fan UI driven by metadata extracted from the saved{' '}
              <code>{tcglSource.file}</code> source ({tcglSource.url}).
            </p>
          </div>
          <div>
            <strong>Play</strong>
            <Link to="/collection">Collection</Link>
            <Link to="/deck">Deck Builder</Link>
            <Link to="/battle">Battle</Link>
          </div>
          <div>
            <strong>Source meta</strong>
            <span>theme-color: {pageMeta.themeColor}</span>
            <span>tracking: {pageMeta.trackingPageType}</span>
            <span>env: {pageMeta.env}</span>
          </div>
        </div>
        <p className="tcgl-footer__legal">
          Fan-made tribute. Pokémon TCG Live, Pokémon, and Transformers are trademarks of their
          respective owners. Not affiliated with The Pokémon Company, Nintendo, Hasbro, or
          TakaraTomy.
        </p>
      </footer>
    </div>
  );
}
