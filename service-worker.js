// Minimal offline app-shell cache for Sổ Chi Tiêu.
// The app itself is a single static HTML file with all data in localStorage,
// so there's no API traffic to worry about — this just makes the shell
// (html/manifest/icons) load instantly and work offline after the first visit.
const CACHE_NAME = 'so-chi-tieu-v1';
const APP_SHELL = [
  './so-chi-tieu.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => {}) // best-effort: a failed pre-cache shouldn't block install
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Stale-while-revalidate: serve from cache immediately if we have it (so the
// app opens instantly / works offline), and refresh the cache in the
// background from the network whenever it's reachable.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
