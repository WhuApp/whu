import React, { useEffect, useState } from 'react';
import {
  Account,
  Client,
  Databases,
  ID,
  Models,
  Permission,
  Role,
  Functions,
} from 'appwrite';
import {
  normalizeCoordinates,
  denormalizeCoordiantes,
} from '../location';
import * as Location from 'expo-location';

const ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = '648644a80adadf63b7d4';
const DATABASE_ID = '6488df9565380dad0d54';
const COLLECTION_FRIENDS_ID = '64aaf2fb45c7f576e38b';
const COLLECTION_LOCATION_ID = '649df6a988dfc4a3026e';
const FUNCTION_ADD_FRIEND_ID = '64aef40f8bc33879bb25';

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);
const account = new Account(client);
const databases = new Databases(client);
const functions = new Functions(client);

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
    const permissions = [
      Permission.read(Role.user(id)),
      Permission.update(Role.user(id)),
      Permission.delete(Role.user(id)),
      Permission.write(Role.user(id)),
    ];
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
      mayShowUserSettingsDialog: true,
    });

    await Promise.all([
      databases.createDocument(DATABASE_ID, COLLECTION_LOCATION_ID, id, {
        time_stamp: new Date().toISOString(),
        ...normalizeCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          altitude: location.coords.altitude,
        }),
      }, permissions)
    ]).catch((reason) => {
      databases.deleteDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id);
      databases.deleteDocument(DATABASE_ID, COLLECTION_LOCATION_ID, id);

      throw new Error(`Failed to setup ${id} because ${reason}`);
    });
  };

  const getFriends = async () => {
    const friends: string[] = [];
    const documents = await databases.listDocuments(DATABASE_ID, COLLECTION_FRIENDS_ID);
    documents.documents.filter((friendship) => friendship.accepted)
      .forEach((friendship) => friends.push(
        friendship.sender === session.userId ? friendship.receiver : friendship.sender
      )
    );
    return friends;
  };

  const getLocation = async () => {
    const document = await databases.getDocument(DATABASE_ID, COLLECTION_LOCATION_ID, session.userId);

    return denormalizeCoordiantes({
      longitude: document.longitude,
      latitude: document.latitude,
      altitude: document.altitude,
    });
  };

  const sendFriendRequest = async (id: string) => {
    const execution = await functions.createExecution(FUNCTION_ADD_FRIEND_ID, `{\"receiver\": \"${id}\"}`);
    const response = JSON.parse(execution.response);
    if (!response.success) return response.error;
  };

  const getFriendRequests = async () => {
    const outgoing: string[] = [];
    const incoming: string[] = [];
    const documents = await databases.listDocuments(DATABASE_ID, COLLECTION_FRIENDS_ID);
    documents.documents.filter((friendship) => !friendship.accepted).forEach((friendship) => {
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
    getFriends,
    getLocation,
    sendFriendRequest,
    getFriendRequests,
    deleteFriendRequest
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
