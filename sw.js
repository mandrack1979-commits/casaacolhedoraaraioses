const CACHE_NAME = 'aaioses-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/sobre.html',
  '/doacoes.html',
  '/acolhimento.html',
  '/necessidades.html',
  '/parceiros.html',
  '/contato.html',
  '/css/estilo.css',
  '/js/site.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
