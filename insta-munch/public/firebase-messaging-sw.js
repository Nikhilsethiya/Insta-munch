importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyAL_iQUB-ZDKWewv7gF-yGHKn2YoKCrRzk",
  authDomain: "insta-munch.firebaseapp.com",
  databaseURL: "https://insta-munch-default-rtdb.firebaseio.com",
  projectId: "insta-munch",
  storageBucket: "insta-munch.appspot.com",
  messagingSenderId: "22724611820",
  appId: "1:22724611820:web:669302d81d4d7bef7adfc9",
  measurementId: "G-2MR29GV4PT",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
