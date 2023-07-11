import { serverTimestamp } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, getAuth, FacebookAuthProvider, getAdditionalUserInfo, signInAnonymously } from "firebase/auth";

import { addDocument, generateKeywords } from '../firebase/service';

const auth = getAuth();

const getLoginHandler = (authProvider) => {
  let loginHandler = async () => {
    let data = await signInWithPopup(auth, authProvider)
    if (getAdditionalUserInfo(data).isNewUser) {
      const userInfo = {
        name: data.user.displayName,
        email: data.user.email,
        uid: data.user.uid,
        avaURL: data.user.photoURL,
        createdAt: serverTimestamp(),
        keywords: generateKeywords(data.user.displayName?.toLowerCase()),
      }
      await addDocument("person", userInfo)
    }
  }
  return loginHandler
}

const facebookLoginHandler = getLoginHandler(new FacebookAuthProvider())
const googleLoginHandler = getLoginHandler(new GoogleAuthProvider())
async function loginGuest () {
  let credential = await signInAnonymously(auth)
  console.log({credential})
}

async function loginWith(googleOrFacebook, ...rest) {
  // this method is async so that exception can be catched by .then.catch
  switch (googleOrFacebook) {
    case "google": return googleLoginHandler(...rest)
    case "facebook": return facebookLoginHandler(...rest)
    default: throw "Not implemented"
  }
}

let authService = {
  loginWith: loginWith,
  loginGuest: loginGuest,
}

export default authService