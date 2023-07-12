import { initializeApp } from "firebase/app";
import config from "../../configs/firebase.config"
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
initializeApp(config)
let db = getFirestore()
export default db