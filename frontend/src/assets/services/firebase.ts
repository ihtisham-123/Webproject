import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDkE2KIoNkPuYLGqoKdMM5O6ombGQx5xEg",
    authDomain: "webproject-3023e.firebaseapp.com",
    projectId: "webproject-3023e",
    storageBucket: "webproject-3023e.firebasestorage.app",
    messagingSenderId: "817298303750",
    appId: "1:817298303750:web:d7418ceeef7e45cb098c87",
    measurementId: "G-FCD575C9J8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage
const storage = getStorage(app);

export { storage };
