const CACHE_NAME = 'mundial2026-v2';
const ASSETS = [
  '/MUNDIAL-2026/',
  '/MUNDIAL-2026/index.html',
  '/MUNDIAL-2026/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('supabase.co')) return; // no cachear Supabase
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
