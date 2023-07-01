import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const logout = () => {
    setUser(null)
  }
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const unsubscibed = onAuthStateChanged(auth, (_user) => {
      if (_user) {
        setUser(_user);
        setIsLoading(false);
        return;
      }
      logout()
      setIsLoading(false);
    });
    return () => {
      unsubscibed();
    }
  }, [history, auth]);
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

const Loading = () => <Spin style={{ position: 'fixed', inset: 0 }} />