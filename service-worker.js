var cacheName = 'weatherPWA';
var filesToCache = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/styles/inline.css',
    '/images/clear.png',
    '/images/cloudy-scattered-showers.png',
    '/images/cloudy.png',
    '/images/fog.png',
    '/images/ic_add_white_24px.svg',
    '/images/ic_refresh_white_24px.svg',
    '/images/partly-cloudy.png',
    '/images/rain.png',
    '/images/scattered-showers.png',
    '/images/sleet.png',
    '/images/snow.png',
    '/images/thunderstorm.png',
    '/images/wind.png',
    '/images/ic_delete_white_24px.png'
  ];
var dataCacheName = 'weatherData-v1';
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
    e.waitUntil(
        caches.keys().then(function(keyList) {
            //Promise.all需要所有枚举对象成功才会返回成功
            //Array.prototype.map(function),创建一个新数组，里面的值是原数组经过函数的返回值 
            return Promise.all(keyList.map(function(key) {
                if(key != cacheName && key != dataCacheName) {
                    //保证数据缓存不会被移除
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker]Fetch', e.request.url);
    var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
    if(e.request.url.indexOf(dataUrl) > -1) {
        /*
         *When the request URL contains dataUrl, the app is asking for fetching the
         *weather data. In this case, the service worker always goes to the network
         *and then cache the response
         */
        e.respondWith(
            caches.open(dataCacheName).then(function(cache) {
                console.log('DEBUG:', cache);
                return fetch(e.request).then(function(response) {
                    console.log('DEBUG:', response);
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    }
    else{
        //Otherwise, the service worker is asking for app shell data
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request);
            })
        );
    }
});