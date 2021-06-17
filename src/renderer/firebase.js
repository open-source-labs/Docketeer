import firebaseui from 'firebaseui'; 
import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: 'AIzaSyAC8yoPq0llly4nbI-JOcYTglUhr2XhBkk',
  authDomain: 'docketeer3-ef822.firebaseapp.com',
  projectId: 'docketeer3-ef822',
  storageBucket: 'docketeer3-ef822.appspot.com',
  messagingSenderId: '517219389795',
  appId: '1:517219389795:web:9a8dbd2232d94984dd4356',
  measurementId: 'G-6MYEZ6RL7V'
};

// This must run before any other firebase functions
firebase.initializeApp(config);

// This is our firebaseui configuration object
// const uiConfig = ({
//   signInSuccessUrl: '/',
//   signInOptions: [
//     window.firebase.auth.GoogleAuthProvider.PROVIDER_ID
//   ],
//   tosUrl: '/terms-of-service' // This doesn't exist yet
// });

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};


// This sets up firebaseui
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// This adds firebaseui to the page
// It does everything else on its own
const startFirebaseUI = function (elementId) {
  ui.start(elementId, uiConfig);
};

// Taken from the bottom of that StackOverflow Article (tots Scrots)
// firebase.auth().onAuthStateChanged((user) => {
//     // if user isn't null then we logged in
//     if (user) {
//       // login
//     } else {
//       // logout
//     }
//   })

export default startFirebaseUI;