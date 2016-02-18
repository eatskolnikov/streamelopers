var CACHE_NAME = 'my-site-cache-vSTREAMELOPERS_CURRENT_VERSION';
var urlsToCache = [
  '/',
  '/assets/img/logos/logo-white-bg.png',
  '/assets/css/main.min.css?v=STREAMELOPERS_CURRENT_VERSION',
  '/app.min.js?v=STREAMELOPERS_CURRENT_VERSION'
];
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
    })
  );
});
