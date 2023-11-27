import{initializeApp} from "firebase/app"
import{getAuth} from "firebase/auth"
const firebaseConfig=  {
    apiKey: "AIzaSyC2VkAvqtthOCN1EKKVaddy_IHAU0rFN6I",
    authDomain: "airtracker-3a758.firebaseapp.com",
    projectId: "airtracker-3a758",
    storageBucket: "airtracker-3a758.appspot.com",
    messagingSenderId: "1087503780839",
    appId: "1:1087503780839:web:bfe1301035abb048228b42",
    measurementId: "G-V6KWM2X1YK"
  };

  const app =initializeApp(firebaseConfig)
  export const database =getAuth(app)
