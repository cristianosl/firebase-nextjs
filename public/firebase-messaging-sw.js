importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCSARzOi6r0uUc2vTAlDWBlcV5b4tBPa24",
  appId: "1:205652586584:web:91746a356871fad0fb9a2d",
  authDomain: "testefirebasecristiano.firebaseapp.com",
  measurementId: "G-Q0CE35BYCL",
  messagingSenderId: "205652586584",
  projectId: "testefirebasecristiano",
  storageBucket: "testefirebasecristiano.appspot.com",
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});