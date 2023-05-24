self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
});

self.addEventListener('pushsubscriptionchange', event => {
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true
    })
    .then(subscription => {
      // Save the subscription to your server
      startPeriodicNotifications();
    })
    .catch(error => {
      console.error('Error subscribing to push notifications:', error);
    })
  );
});

function startPeriodicNotifications() {
  setInterval(sendNotification, 30 * 60 * 1000); // 30 minutes in milliseconds
}

function sendNotification() {
  const options = {
    body: 'This is a periodic notification from the service worker!',
    icon: 'path/to/icon.png'
  };

  self.registration.showNotification('Hello!', options);
}
