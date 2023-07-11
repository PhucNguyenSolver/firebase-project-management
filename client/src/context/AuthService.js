import { serverTimestamp } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, getAuth, FacebookAuthProvider, getAdditionalUserInfo, signInAnonymously } from "firebase/auth";

import { addDocument, generateKeywords } from '../firebase/service';

let getAuthProvider = (function () {
  const fbInstance = new FacebookAuthProvider()
  const ggInstance = new GoogleAuthProvider()
  return function (str) {
    switch (str) {
      case "google": return ggInstance
      case "facebook": return fbInstance
      default: throw "Not implemented"
    }
  }
})()

/**
 * 
 * @param {string} provider google / facebook / ...
 * Throw if not implemented
 */
export async function loginWith(provider) {
  let data = await signInWithPopup(getAuth(), getAuthProvider(provider))
  if (getAdditionalUserInfo(data).isNewUser) {
    // TODO: (refactor) firebase service should not be here
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

export async function loginGuest() {
  let auth = getAuth();
  let credential = await signInAnonymously(auth)
  console.log({ credential })
}