importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBOufkehZtx8l7FErtstXY98mlPTXWQ4vU",
		authDomain: "testingappproject.firebaseapp.com",
		databaseURL: "https://testingappproject.firebaseio.com",
		storageBucket: "testingappproject.appspot.com",
		messagingSenderId: "358517152444"
	};
	firebase.initializeApp(config);
	
const messaging = firebase.messaging();