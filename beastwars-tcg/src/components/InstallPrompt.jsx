import { useEffect, useState } from 'react';
import './InstallPrompt.css';

/**
 * Cross-platform install helper:
 * - Android/Chrome/Edge: beforeinstallprompt
 * - iOS Safari: manual Add to Home Screen instructions
 * - Desktop: same as Chromium install prompt when available
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(false);
  const [ios, setIos] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // iOS Safari
      window.navigator.standalone === true;
    if (standalone) {
      setInstalled(true);
      return;
    }

    const isIos =
      /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIos(isIos);

    const dismissed = sessionStorage.getItem('bw-pwa-dismiss') === '1';
    if (dismissed) return;

    const onBip = (e) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', onBip);

    const onInstalled = () => {
      setInstalled(true);
      setVisible(false);
    };
    window.addEventListener('appinstalled', onInstalled);

    // Show iOS tip after a short delay
    let t;
    if (isIos) {
      t = setTimeout(() => setVisible(true), 1800);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBip);
      window.removeEventListener('appinstalled', onInstalled);
      if (t) clearTimeout(t);
    };
  }, []);

  if (installed || !visible) return null;

  const dismiss = () => {
    sessionStorage.setItem('bw-pwa-dismiss', '1');
    setVisible(false);
  };

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    try {
      await deferred.userChoice;
    } catch {
      /* ignore */
    }
    setDeferred(null);
    setVisible(false);
  };

  return (
    <div className="install-prompt" role="dialog" aria-label="Install web app">
      <div className="install-prompt__body">
        <strong>Install Beast Wars TCG</strong>
        {ios ? (
          <p>
            On iPhone / iPad: tap <em>Share</em> → <em>Add to Home Screen</em> to install this web
            app.
          </p>
        ) : deferred ? (
          <p>Install as an app on this device for offline play and a full-screen experience.</p>
        ) : (
          <p>
            Open in Chrome, Edge, or Safari to install this site as a web app (Add to Home Screen /
            Install app).
          </p>
        )}
      </div>
      <div className="install-prompt__actions">
        {deferred && (
          <button type="button" className="install-prompt__btn" onClick={install}>
            Install
          </button>
        )}
        <button type="button" className="install-prompt__btn install-prompt__btn--ghost" onClick={dismiss}>
          Not now
        </button>
      </div>
    </div>
  );
}
