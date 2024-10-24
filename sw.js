// service-worker.js

const CACHE_NAME = 'my-app-cache'; // Zmień na unikalną nazwę cache'a

self.addEventListener('install', (event) => {
    // Aktywuj natychmiastowo Service Worker
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Usuń wszystkie stare cache
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName === CACHE_NAME) {
                        return;
                    }
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((response) => {
                // Jeśli zasób jest w cache, zwróć go, w przeciwnym razie pobierz nowy
                return response || fetch(event.request).then((networkResponse) => {
                    // Zapisz nową wersję w cache
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        })
    );
});
