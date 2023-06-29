import React, { useEffect, useState } from 'react';
import { Account, Client, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('648644a80adadf63b7d4');
const account = new Account(client);

const AuthContext = React.createContext(null);

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  
  useEffect(() => {
    account.get().then(
      () => setLoggedIn(true),
      () => setLoggedIn(false)
    );
  }, []);

  const signIn = (mail: string, password: string) => {
    return account.createEmailSession(mail, password).then((result) => { 
      setLoggedIn(true);
      return result;
    });
  };

  const signOut = () => {
    return account.deleteSession('current').then((result) => {
      setLoggedIn(false);
      return result;
    });
  };

  const signUp = (name: string, mail: string, password: string) => {
    return account.create(ID.unique(), mail, password, name).then(
      () => { return signIn(mail, password) },
      (reason) => { Promise.reject(reason) }
    );
  };

  const getSession = () =>
    account.get();

  const auth = { 
    signIn,
    signOut,
    signUp,
    getSession,
    loggedIn,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
