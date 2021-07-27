self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('airhorner').then(function(cache) {
            return cache.addAll([
                '/',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
});
