self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("wort-app").then(cache => {
      return cache.addAll([
        "index.html",
        "app.js",
        "manifest.json"
      ]);
    })
  );
});