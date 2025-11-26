// Nama cache
const CACHE_NAME = "jadwalfeb-cache-v1";

// File yang dicache untuk offline
const FILES_TO_CACHE = [
  "/jadwalfeb/",
  "/jadwalfeb/index.html",
  "/jadwalfeb/admin.html",
  "/jadwalfeb/style.css",
  "/jadwalfeb/script.js",
  "/jadwalfeb/icons/icon-192.png",
  "/jadwalfeb/icons/icon-512.png"
];

// Install service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Aktivasi service worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch offline handler
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
