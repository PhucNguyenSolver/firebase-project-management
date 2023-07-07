import { serverTimestamp } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, getAuth, FacebookAuthProvider, getAdditionalUserInfo } from "firebase/auth";

import { addDocument, generateKeywords } from '../../firebase/service';

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

export const facebookLoginHandler = getLoginHandler(new FacebookAuthProvider())
export const googleLoginHandler = getLoginHandler(new GoogleAuthProvider())
export const passwordLoginHandler = async () => { throw "Not implemented" }
