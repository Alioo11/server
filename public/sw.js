self.addEventListener("install", (e) => {
  console.log("installing service worker");
  console.log(e);
});

self.addEventListener("push", (event) => {
  event.waitUntil(self.registration.showNotification("BOOM !!"));
});
