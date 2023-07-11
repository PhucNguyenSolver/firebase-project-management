import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { loginWith, loginGuest } from './AuthService'
import { Spin } from 'antd';
import { phuc } from './user-data.js'

export const AuthContext = React.createContext();


function fillGuestData(initial) { return { ...initial, ...phuc } }


export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  function logout() { setUser() }

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

  return (
    <AuthContext.Provider value={{
      user,
      logout,
      loginWith,
      loginGuest,
    }}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

const Loading = () => {
  return <Spin style={{ position: 'fixed', inset: 0 }} />
}