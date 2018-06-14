/**
 * === Service Worker ===
 **/
const CACHE_NAME = 'portfolio-sw-cache' // cache name
const ORIGIN = location.protocol + '//' + location.hostname; // ORIGIN host
let urlsToCache = [
    `/`,
    `/index.html`,
    `/app.js`,
    `/app.css`,
    `/vendor.js`,
    `/vendor.css`,
    `/data.js`,
    `/component.js`,
    `/component.css`,
    `https://maps.googleapi.com/maps/api/js?`
]
// https://maps.googleapis.com/maps/api/js/ViewportInfoService.GetViewportInfo?1m6&1m2&1d34.6439916728885&2d135.78353990283597&2m2&1d34.65220002017185&2d135.79704395804413&2u17&4sja&5e0&6sm%40425000000&7b0&8e0&callback=_xdc_._a17soj&token=9344

// install module
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache')
            return cache.addAll(urlsToCache)
        })
    )
})

// fetch module
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {

            // If a response has the cache, it returns the data to client.
            if (res) {
                return res
            }

            // network request
            // TODO: you must use `clone`, because a request handles once only. So, you prepare two files.
            const fetchRequest = e.request.clone()

            return fetch(fetchRequest).then(response => {
                // Checking a response whether it corrects.
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response
                }

                // TODO: you must use `clone`, because a request handles once only. So, you prepare two files.
                const responseToCache = response.clone()

                caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, responseToCache) // Registering cache data
                })

                return response
            })
        })
    )
})

// update module
const cacheWhiteList = [
    CACHE_NAME
]

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})