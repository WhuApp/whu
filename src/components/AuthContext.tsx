import React, { useEffect, useState } from 'react';
import {
  Account,
  Databases,
  ID,
  Models,
  Permission,
  Role,
  Query,
} from 'appwrite';
import {
  normalizeCoordinates,
} from '../location';
import * as Location from 'expo-location';
import { client } from '../appwrite';

const DATABASE_ID = '6488df9565380dad0d54';
const COLLECTION_FRIENDS_ID = '64aaf2fb45c7f576e38b';
const COLLECTION_LOCATION_ID = '649df6a988dfc4a3026e';

const account = new Account(client);
const databases = new Databases(client);

const AuthContext = React.createContext(null);

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Models.Session | undefined>();

  useEffect(() => {
    account.getSession('current').then(
      (current) => setSession(current),
      () => setSession(null),
    );
  }, []);

  const signIn = async (mail: string, password: string) => {
    setSession(await account.createEmailSession(mail, password));
  };

  const signOut = async () => {
    await account.deleteSession('current');
    setSession(null);
  };

  const signUp = async (name: string, mail: string, password: string) => {
    const user = await account.create(ID.unique(), mail, password, name);
    const session = await account.createEmailSession(mail, password);

    await setupNewUser(user.$id);
    setSession(session);
  };

  const setupNewUser = async (id: string) => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
      mayShowUserSettingsDialog: true,
    });

    await databases.createDocument(
      DATABASE_ID, 
      COLLECTION_LOCATION_ID, 
      id, 
      {
        timestamp: new Date().getTime(),
        ...normalizeCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          altitude: location.coords.altitude,
        }),
      }, 
      [
        Permission.read(Role.user(id)),
        Permission.update(Role.user(id)),
        Permission.delete(Role.user(id)),
        Permission.write(Role.user(id)),
      ]
    );
  };

  const getFriendRequests = async () => {
    const outgoing: string[] = [];
    const incoming: string[] = [];
    const documents = await databases.listDocuments(DATABASE_ID, COLLECTION_FRIENDS_ID, [Query.equal('accepted', false)]);
    documents.documents.forEach((friendship) => {
      if (friendship.sender === session.userId) outgoing.push(friendship.receiver);
      if (friendship.receiver === session.userId) incoming.push(friendship.sender);
    });

    return { 
      incoming: incoming, 
      outgoing: outgoing
    };
  };

  const deleteFriendRequest = async (id: string) => {
    const documents = await databases.listDocuments(DATABASE_ID, COLLECTION_FRIENDS_ID);
    const doc = documents.documents.filter((friendship) => friendship.sender === id || friendship.receiver === id)[0];
    databases.deleteDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, doc.$id);
  };

  const auth = {
    session,
    signIn,
    signOut,
    signUp,
    getFriendRequests,
    deleteFriendRequest
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
