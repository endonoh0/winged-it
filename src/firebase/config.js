// import everything from firebase package
import * as firebase from 'firebase/app';

// store images
import 'firebase/storage';

// store in database
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCOzYA08TPR6BNQlM-olCcC9z1M7Sfu_To",
  authDomain: "fir-react-app-fc2b1.firebaseapp.com",
  databaseURL: "https://fir-react-app-fc2b1.firebaseio.com",
  projectId: "fir-react-app-fc2b1",
  storageBucket: "fir-react-app-fc2b1.appspot.com",
  messagingSenderId: "1098017367830",
  appId: "1:1098017367830:web:5986d89dcfd1ac388a9237",
  measurementId: "G-Z0N2DRELF5"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize storage service
const projectStorage = firebase.storage();

// initialize firestore service
const projectFirestore = firebase.firestore();

// firebase uses a special type of data (timestamp) in firestore
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timeStamp};
