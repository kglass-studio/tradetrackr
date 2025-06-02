self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  // Optionally cache requests here later
})
