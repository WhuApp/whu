import React, { useEffect, useState } from 'react';
import { Account, Client, Databases, ID, Query } from 'appwrite';

const ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = '648644a80adadf63b7d4';
const DATABASE_ID = '6488df9565380dad0d54';
const COLLECTION_ID = '6488e5cd3eb651e484d1';

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);
const account = new Account(client);
const databases = new Databases(client);

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
      (data) => {
        databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(),
          {
            id: data.$id,
            friends: ['649d9184e0627ccff6a2'],
            lastSeen: new Date().toISOString(),
            location: '+47.619093+007.635496+00460.2000', // ±DD.DDDDDD±DDD.DDDDDD±AAAAA.AAAA
          }
        ).then(() => {
          return signIn(mail, password);
        },
        (reason) => { 
          Promise.reject(reason) 
        });
      },
      (reason) => { Promise.reject(reason) }
    );
  };

  const getSession = () =>
    account.get();

  const getDocument = () => {
    return getSession().then((data) => {
      return databases.listDocuments(DATABASE_ID, COLLECTION_ID, [ Query.equal('id', data.$id) ]).then((all) => { 
        return all.documents[0];
      });
    });
  };

  const auth = {
    signIn,
    signOut,
    signUp,
    getSession,
    getDocument,
    loggedIn,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
