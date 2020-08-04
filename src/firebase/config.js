// import everything from firebase package
import * as firebase from 'firebase/app';

// store images
import 'firebase/storage';

// store in database
import 'firebase/firestore';

// user login
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize storage service
const projectStorage = firebase.storage();

// initialize firestore service
const projectFirestore = firebase.firestore();

const projectAuth = firebase.auth();

// firebase uses a special type of data (timestamp) in firestore
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

// Listen to Authenticaton provider to setUser
function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback({ loggedIn: true, email: user.email, uid: user.uid });
    } else {
      callback({ loggedIn: false });
    }
  })};

export { projectStorage, projectFirestore, projectAuth, timeStamp, onAuthStateChange};
