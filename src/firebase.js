import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrMT_jq-8HFehK5BPfoejl2n6410VVmi0",
  authDomain: "sam-s-whatsapp-clone.firebaseapp.com",
  databaseURL: "https://sam-s-whatsapp-clone.firebaseio.com",
  projectId: "sam-s-whatsapp-clone",
  storageBucket: "sam-s-whatsapp-clone.appspot.com",
  messagingSenderId: "1075563611162",
  appId: "1:1075563611162:web:2becbba7fc794eaac17da3",
  measurementId: "G-QXZJLZFG4G"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
 
 export {auth, provider};
 export default db;