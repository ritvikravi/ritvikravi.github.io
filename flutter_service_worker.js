'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"android-chrome-192x192.png": "e1ebe946577ac33951a9668f8e863150",
"android-chrome-512x512.png": "4b2bc45a5c75523244ba5f3fb0e944b1",
"apple-touch-icon.png": "88f1be0cd0d1ae0c7c3b1c3209e302df",
"assets/AssetManifest.bin": "1770cb6fe1fb383c80eb89a088c0e02c",
"assets/AssetManifest.bin.json": "185ab7f88e32d10885235ee434280778",
"assets/AssetManifest.json": "0d326a79d893f3b9f49b1d04ec5fc106",
"assets/assets/images/2008.jpg": "37b6dd0ad1a17627ad815e1ade484c1c",
"assets/assets/images/2011.JPG": "e2edb69e44ff39c7cb941882b4319378",
"assets/assets/images/2024.jpg": "c81f8ffaa66b1811acd09e3b5d7cc418",
"assets/assets/images/logo_colored.png": "f06dfd2094b47e1243a5b444ef08827a",
"assets/assets/images/name_logo_black.png": "24e09855bfc35502451afb77bdb2c4e2",
"assets/assets/images/name_logo_white.png": "13d363047b50f37335da7725e3aa4be8",
"assets/assets/images/ritreet1.jpg": "1f93a6ba1ccf55e4d826a451cec0264b",
"assets/assets/images/ritreet10.jpg": "e66835d54abc1a6b4a525c3b574f16a3",
"assets/assets/images/ritreet11.jpg": "fe09c4bef21f8aa917a2f080cfb2839a",
"assets/assets/images/ritreet12.jpg": "fef2b9de559a40a77c9af3264e590142",
"assets/assets/images/ritreet13.jpg": "08407bbdc1d4282c4234c57289082909",
"assets/assets/images/ritreet14.jpg": "0d5a0cc2238c05a3b762c919ff6541d7",
"assets/assets/images/ritreet15.jpg": "293115d06c3727e123560a5db7315718",
"assets/assets/images/ritreet2.jpg": "367e9776bfe224deafce6770b46a5b6c",
"assets/assets/images/ritreet3.jpg": "d758c288d0cc030b70317c69f6832d40",
"assets/assets/images/ritreet4.jpg": "11699adb7e12dcddb65ffb31bddf05b7",
"assets/assets/images/ritreet5.jpg": "6bf235dab97aa5c05a79466721d90805",
"assets/assets/images/ritreet6.jpg": "8c9cf8c920e7575125bd5e0401f9a1a9",
"assets/assets/images/ritreet7.jpg": "76cf6896f69e7ed46d0c725fc0ca3427",
"assets/assets/images/ritreet8.jpg": "13bcfde3ad965dac464f34b2ea3f07cd",
"assets/assets/images/ritreet9.jpg": "2c5873ea0489c731aa10de509cfd7e09",
"assets/FontManifest.json": "62ff1c991ed7eead2282f2fbfe63d67c",
"assets/fonts/Consolas.ttf": "fb505e28b6d130f08fe8f070e0d6b1b8",
"assets/fonts/digital-7_mono.ttf": "1e670d88b23c7ab956f1829e3828a210",
"assets/fonts/Helvetica-Bold.ttf": "d13db1fed3945c3b8c3293bfcfadb32f",
"assets/fonts/Helvetica-LightOblique.ttf": "09ed53513d4e116220b00e71b5c04668",
"assets/fonts/Helvetica.ttf": "1b580d980532792578c54897ca387e2c",
"assets/fonts/MaterialIcons-Regular.otf": "cd005c69cd55d7722f41172946e6d68a",
"assets/fonts/sans-serif.otf": "3b56b62c70f222b4bd27771524238a6a",
"assets/fonts/SF-Pro-Text-Bold.otf": "88b6e0b21919fa6abb7899faa1571f01",
"assets/fonts/SF-Pro-Text-Heavy.otf": "fadde3407f7fb52b942bd5bac0ba042c",
"assets/fonts/SF-Pro-Text-Medium.otf": "ded5efe3e8ec62553c3b10f4edd4ca8d",
"assets/fonts/SF-Pro.ttf": "b00758ffdb3216ea93c6fc6957aa2cfa",
"assets/fonts/toxigenesis_bd.otf": "44cfdead34424bdc49b11c3dc7e64e55",
"assets/fonts/Vipnagorgialla_Bd.otf": "639b5cd7d90c51cc3c50b1ae95369a96",
"assets/fonts/Vipnagorgialla_Bd_It.otf": "c7ecd98f37d0ccca394099f13c7c9c8a",
"assets/fonts/Vipnagorgialla_Rg.otf": "daa78b83b2884858b243328f1386a528",
"assets/fonts/Vipnagorgialla_Rg_It.otf": "1b9ebf18dfa112dbbd3ee1beba8e19a1",
"assets/NOTICES": "5bff923d23585304eb7ef9d9ec2abe2a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"favicon-16x16.png": "b488840450f468c16e3a1c39d129a83a",
"favicon-32x32.png": "d365b2484eccbd4f658d50e8da2ac49e",
"favicon.ico": "7b4fd4acb8a186b07a986fdc62c04e68",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "b3de27f0251189be61678efd4c8b64de",
"index.html": "9ada85bd13ed1b5a9947e0105be14462",
"/": "9ada85bd13ed1b5a9947e0105be14462",
"main.dart.js": "30f87288f343034f5bf33f36a0173381",
"site.webmanifest": "053100cb84a50d2ae7f5492f7dd7f25e",
"version.json": "6ca8e950ae956b301aad34d3feafdd3e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
