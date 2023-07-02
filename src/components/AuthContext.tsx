import React, { useEffect, useState } from 'react';
import {
  Account,
  Client,
  Databases,
  ID,
  Permission,
  Role,
} from 'appwrite';
import { normalizeLatitude } from '../Location';

const ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = '648644a80adadf63b7d4';
const DATABASE_ID = '6488df9565380dad0d54';
const COLLECTION_FRIENDS_ID = '649df56d2fc10d735314';
const COLLECTION_LOCATION_ID = '649df6a988dfc4a3026e';

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
const account = new Account(client);
const databases = new Databases(client);

const AuthContext = React.createContext(null);

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    account.get().then(
      () => setLoggedIn(true),
      () => setLoggedIn(false),
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
    return account.create(ID.unique(), mail, password, name).then((user) => {
      return account.createEmailSession(mail, password).then(() => {
        return createStartDocuments(user.$id).then(() => setLoggedIn(true));
      });
    });
  };

  const createStartDocuments = (id: string) => {
    const permissions = [
      Permission.read(Role.user(id)),
      Permission.update(Role.user(id)),
      Permission.delete(Role.user(id)),
      Permission.write(Role.user(id))
    ];

    return Promise.all([
      databases.createDocument(
        DATABASE_ID, 
        COLLECTION_FRIENDS_ID, 
        id, 
        { friends: ['649d9184e0627ccff6a2'] }, 
        permissions
      ),
      databases.createDocument(
        DATABASE_ID, 
        COLLECTION_LOCATION_ID,
        id, 
        {
          time_stamp: new Date().toISOString(),
          ...normalizeLatitude({ 
            latitude: 47.619093, 
            longitude: 7.635496, 
            altitude: 460.2 
          })
        }, 
        permissions
      )
    ]).catch(() => {
      databases.deleteDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id);
      databases.deleteDocument(DATABASE_ID, COLLECTION_LOCATION_ID, id);
    });
  };

  const getSession = () => account.get();

  const getFriends = () => {
    return getSession().then((user) => {
      return databases.getDocument(
        DATABASE_ID,
        COLLECTION_FRIENDS_ID,
        user.$id,
      );
    });
  };

  const auth = {
    signIn,
    signOut,
    signUp,
    getSession,
    getFriends,
    loggedIn,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
