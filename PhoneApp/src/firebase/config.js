import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'PUTYOURDATAHERE',
  authDomain: 'PUTYOURDATAHERE',
  databaseURL: 'PUTYOURDATAHERE',
  projectId: 'PUTYOURDATAHERE',
  storageBucket: 'PUTYOURDATAHERE',
  messagingSenderId: 'PUTYOURDATAHERE',
  appId: 'PUTYOURDATAHERE',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };