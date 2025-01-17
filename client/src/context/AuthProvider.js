import React, { useState, useEffect } from 'react';
import LoadingView from '../components/LoadingView.js';
import { phuc } from './user-data.js'
import { serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, getAuth, FacebookAuthProvider, getAdditionalUserInfo, signInAnonymously, signOut } from "firebase/auth";
import { addDocument, generateKeywords } from '../firebase/service';
import { withPreAndPostExecutionBehavior as extendBehavior } from '../utils'

let getAuthProvider = (function () {
  const fbInstance = new FacebookAuthProvider()
  const ggInstance = new GoogleAuthProvider()
  return function (str) {
    switch (str) {
      case "google": return ggInstance
      case "facebook": return fbInstance
      default: throw { message: "Not implemented" }
    }
  }
})()

/**
 * 
 * @param {string} provider google / facebook / ...
 * Throw if not implemented
 */
async function loginWith(provider) {
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

async function loginGuest() {
  let auth = getAuth();
  let credential = await signInAnonymously(auth)
  console.log({ credential })
}


export const AuthContext = React.createContext();


function fillGuestData(initial) { return { ...initial, ...phuc } }


export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  function logout() {
    setUser()
    signOut(getAuth())
  }

  useEffect(() => {
    const auth = getAuth()
    const unsubscibed = onAuthStateChanged(auth, (_user) => {
      setIsLoading(false);
      if (!_user) {
        logout()
      } else if (_user.isAnonymous) {
        setUser(fillGuestData(_user))
      } else {
        setUser(_user)
      }
    });
    return unsubscibed
  }, []);

  useEffect(() => {
    console.info("updated")
    console.info({ user })
  }, [user])

  const preFn = () => setIsLoading(true)
  const afterFn = () => setIsLoading(false)
  return (
    <AuthContext.Provider value={{
      user,
      logout,
      loginWith: extendBehavior(loginWith, preFn, afterFn),
      loginGuest: extendBehavior(loginGuest, preFn, afterFn),
    }}>
      {children}
      {isLoading && <LoadingView />}
    </AuthContext.Provider>
  );
}
