importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCSARzOi6r0uUc2vTAlDWBlcV5b4tBPa24",
    appId: "1:205652586584:web:91746a356871fad0fb9a2d",
    authDomain: "testefirebasecristiano.firebaseapp.com",
    measurementId: "G-Q0CE35BYCL",
    messagingSenderId: "205652586584",
    projectId: "testefirebasecristiano",
    storageBucket: "testefirebasecristiano.appspot.com",
  });
  firebase.messaging();
  //background notifications will be received here
  firebase
    .messaging()
    .setBackgroundMessageHandler((payload) => console.log("payload", payload));
}
