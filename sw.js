/* =============================================
   STUDYO — Service Worker (PWA offline shell)
   ============================================= */

const CACHE_VERSION = 'studyo-v1';
const APP_SHELL = [
  './',
  './index.html',
  './css/style.css',
  './css/discord.css',
  './js/data.js',
  './js/app.js',
  './js/firebase-config.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install: precache the app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn('[SW] Precache failed:', err))
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET requests
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // NEVER intercept Firebase / Google APIs / auth — must always hit the network live.
  // Let the browser handle them normally to avoid breaking auth & Firestore.
  const bypassHosts = [
    'firestore.googleapis.com',
    'firebase.googleapis.com',
    'identitytoolkit.googleapis.com',
    'securetoken.googleapis.com',
    'www.googleapis.com',
    'apis.google.com',
    'accounts.google.com',
    'firebaseinstallations.googleapis.com'
  ];
  if (bypassHosts.some((h) => url.hostname.includes(h))) {
    return; // do not call respondWith → default network behaviour
  }

  // Same-origin static assets: cache-first, then update in background (stale-while-revalidate)
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const networkFetch = fetch(req)
          .then((res) => {
            if (res && res.status === 200 && res.type === 'basic') {
              const copy = res.clone();
              caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
            }
            return res;
          })
          .catch(() => cached); // offline → fall back to cache
        return cached || networkFetch;
      })
    );
    return;
  }

  // Cross-origin (e.g. Google Fonts): network-first, cache fallback
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
