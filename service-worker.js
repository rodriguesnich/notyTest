// Register the service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    self.registration.showNotification("Service Worker Installed", {
      body: "You will receive notifications at specified intervals.",
    })
  );
});

// Schedule notifications at specified intervals
self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.registration.showNotification("Service Worker Activated", {
      body: "Notifications will be sent at intervals: 1 min, 15 min, and every 30 min since then.",
    })
  );

  // Schedule the initial notifications
  scheduleNotification(1);
  scheduleNotification(15);
  scheduleNotification(30);

  // Start the interval for subsequent notifications
  setInterval(() => {
    scheduleNotification(30);
  }, 30 * 60 * 1000); // 30 minutes interval
});

// Schedule a notification after a specified time interval
function scheduleNotification(minutes) {
  const interval = minutes * 60 * 1000; // Convert minutes to milliseconds
  const now = Date.now();

  self.registration.showNotification("Notification", {
    body: `Notification scheduled ${minutes} minute(s) after installation.`,
    timestamp: now + interval,
  });
}

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  // You can customize the behavior when the notification is clicked.
});
