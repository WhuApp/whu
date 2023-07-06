import React, { useEffect, useState } from 'react';
import {
  Account,
  Client,
  Databases,
  ID,
  Models,
  Permission,
  Role,
} from 'appwrite';
import {
  normalizeCoordinates,
  denormalizeCoordiantes,
} from '../location';
import * as Location from 'expo-location';

const ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = '648644a80adadf63b7d4';
const DATABASE_ID = '6488df9565380dad0d54';
const COLLECTION_FRIENDS_ID = '649df56d2fc10d735314';
const COLLECTION_LOCATION_ID = '649df6a988dfc4a3026e';

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);
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
      databases.createDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, { friends: [] }, permissions),
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
    const document = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId);
    return document.friends;
  };

  const getLocation = async () => {
    const document = await databases.getDocument(DATABASE_ID, COLLECTION_LOCATION_ID, session.userId);

    return denormalizeCoordiantes({
      longitude: document.longitude,
      latitude: document.latitude,
      altitude: document.altitude,
    });
  };

  const sendFriendRequest = async (id: string): Promise<never | string> => {
    const other = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id);
    const self = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId);
    const result = [];

    if (self.friends.includes(id)) return 'Already friends';
    if (self.out.includes(id)) return 'Already requested';
    if (Array.isArray(other?.documents)) return 'Not found';

    if (self.in.includes(id)) {
      result.push(
        databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId, {
          in: self.in.filter((x: string) => x !== id),
          friends: [id, ...self.friends],
        }),
        databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, {
          out: self.out.filter((x: string) => x !== session.userId),
          friends: [session.userId, ...other.friends],
        }),
      );
    } else {
      result.push(
        databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId, {
          out: [id, ...self.out],
        }),
        databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, {
          in: [session.userId, ...other.in],
        }),
      );
    }

    await Promise.all(result).catch((reason) => {
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId, self);
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, other);

      throw new Error(`Sending request to ${id} failed because ${reason}`);
    });
  };

  const getFriendRequests = async () => {
    const document = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId);

    return { 
      incoming: document.in, 
      outgoing: document.out 
    };
  };

  const cancelFriendRequest = async (id: string) => {
    const other = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id);
    const self = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId);

    await Promise.all([
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId, {
        out: self.out.filter((x: string) => x !== id),
      }),
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, {
        in: other.in.filter((x: string) => x !== session.userId),
      }),
    ]).catch((reason) => {
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId, self);
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, other);

      throw new Error(`Cancel friend request to ${id} failed because ${reason}`);
    });
  };

  const declineFriendRequest = async (id: string) => {
    const other = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id);
    const self = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId);

    if (!self.in.includes(id)) throw new Error(`No request from user ${id}`);

    await Promise.all([
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId, {
        in: self.in.filter((x: string) => x !== id)
      }),
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, {
        out: other.out.filter((x: string) => x !== session.userId)
      })
    ]).catch((reason) => {
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId, self);
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, other);

      throw new Error(`Decline failed because ${reason}`);
    });
  };

  const removeFriend = async (id: string) => {
    const other = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id);
    const self = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId);

    if (self.friends.includes(id)) throw new Error(`Not friends with ${id}`);

    return Promise.all([
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId, {
        friends: self.friends.filter((x: string) => x !== id),
      }),
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, {
        friends: self.friends.filter((x: string) => x !== session.userId),
      }),
    ]).catch((reason) => {
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, session.userId, self);
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, other);

      throw new Error(`Removing friend ${id} failed beacuse ${reason}`);
    });
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
    cancelFriendRequest,
    declineFriendRequest,
    removeFriend,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
