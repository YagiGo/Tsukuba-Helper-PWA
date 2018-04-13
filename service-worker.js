var cacheName = 'weatherPWA';
var filesToCache = [];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    /*The extendableEvent.waitUntil() method tells the event dispatcher that work is ongoing. 
    It can also be used to detect whether that work was successful. 
    In service workers, waitUntil() tells the browser that work is ongoing until the promise settles, 
    and it shouldn't terminate the service worker if it wants that work to complete.
    */
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Cacheing app shell');
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
});
