import React, { useEffect, useState } from 'react';
import { Account, Client, Databases, ID, Permission, Role } from 'appwrite';
import { normalizeCoordinates, denormalizeCoordiantes } from '../location';
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
        return setupNewUser(user.$id).then(() => setLoggedIn(true));
      });
    });
  };

  const setupNewUser = (id: string) => {
    const permissions = [
      Permission.read(Role.user(id)),
      Permission.update(Role.user(id)),
      Permission.delete(Role.user(id)),
      Permission.write(Role.user(id)),
    ];

    return Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
      mayShowUserSettingsDialog: true,
    }).then((location) => {
      return Promise.all([
        databases.createDocument(
          DATABASE_ID,
          COLLECTION_FRIENDS_ID,
          id,
          { friends: [] },
          permissions,
        ),
        databases.createDocument(
          DATABASE_ID,
          COLLECTION_LOCATION_ID,
          id,
          {
            time_stamp: new Date().toISOString(),
            ...normalizeCoordinates({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              altitude: location.coords.altitude,
            }),
          },
          permissions,
        ),
      ]).catch(() => {
        databases.deleteDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id);
        databases.deleteDocument(DATABASE_ID, COLLECTION_LOCATION_ID, id);
      });
    });
  };

  const getSession = () => account.get();

  const getFriends = async () => {
    const user = await getSession();
    const doc = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_FRIENDS_ID,
      user.$id,
    );
    return doc.friends;
  };

  const getLocation = async () => {
    const user = await getSession();
    const doc = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_LOCATION_ID,
      user.$id,
    );
    return denormalizeCoordiantes({
      longitude: doc.longitude,
      latitude: doc.latitude,
      altitude: doc.altitude,
    });
  };

  const sendFriendRequest = async (friendId: string) => {
    const user = await getSession();

    const docFriend = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_FRIENDS_ID,
      friendId,
    );

    const docSelf = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_FRIENDS_ID,
      user.$id,
    );

    const result = [];

    if (docSelf.friends.includes(friendId))
      return Promise.reject('You are already Friends');
    if (docSelf.out.includes(friendId))
      return Promise.reject('Friend request already sent');

    if (docSelf.in.includes(friendId)) {
      result.push(
        databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, user.$id, {
          in: docSelf.in.filter((id: string) => id !== friendId),
          friends: [friendId, ...docSelf.friends],
        }),
        databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, friendId, {
          out: docSelf.out.filter((id: string) => id !== user.$id),
          friends: [user.$id, ...docFriend.friends],
        }),
      );
    } else {
      result.push(
        databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, user.$id, {
          out: [friendId, ...docSelf.out],
        }),
        databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, friendId, {
          in: [user.$id, ...docFriend.in],
        }),
      );
    }

    return Promise.all(result).catch(() => {
      //restore documents to state before update
      databases.updateDocument(
        DATABASE_ID,
        COLLECTION_FRIENDS_ID,
        user.$id,
        docSelf,
      );
      databases.updateDocument(
        DATABASE_ID,
        COLLECTION_FRIENDS_ID,
        friendId,
        docFriend,
      );
    });
  };

  const getFriendRequests = async () => {
    const user = await getSession();
    const doc = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_FRIENDS_ID,
      user.$id,
    );
    return { incoming: doc.in, outgoing: doc.out };
  };

  const cancelFriendRequest = async (friendId: string) => {
    const user = await getSession();

    const docFriend = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_FRIENDS_ID,
      friendId,
    );

    const docSelf = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_FRIENDS_ID,
      user.$id,
    );

    const result = [
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, user.$id, {
        out: docSelf.out.filter((id) => id !== friendId),
      }),
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, friendId, {
        in: docFriend.in.filter((id) => id !== user.$id),
      }),
    ];

    return Promise.all(result).catch(() => {
      //restore documents to state before update
      databases.updateDocument(
        DATABASE_ID,
        COLLECTION_FRIENDS_ID,
        user.$id,
        docSelf,
      );
      databases.updateDocument(
        DATABASE_ID,
        COLLECTION_FRIENDS_ID,
        friendId,
        docFriend,
      );
    });
  };

  const declineFriendRequest = async (id: string) => {
    // TODO store session as state?
    const user = await getSession();

    // TODO single request to get both?
    const other = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id);
    const self = await databases.getDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, user.$id);

    if (!self.in.includes(id)) throw new Error(`No request from user ${id}`);

    await Promise.all([
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, user.$id, {
        in: self.in.filter((x: string) => x !== id)
      }),
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, {
        out: other.out.filter((x: string) => x !== user.$id)
      })
    ]).catch((reason) => {
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, user.$id, self);
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id, other);

      throw new Error(`Decline failed because ${reason}`);
    });
  };

  const removeFriend = async (friendId: string) => {
    const user = await getSession();

    const docFriend = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_FRIENDS_ID,
      friendId,
    );

    const docSelf = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_FRIENDS_ID,
      user.$id,
    );

    if (docSelf.friends.includes(friendId))
      return Promise.reject('You are not friends with this user');

    const result = [
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, user.$id, {
        friends: docSelf.friends.filter((id: string) => id !== friendId),
      }),
      databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, friendId, {
        friends: docSelf.friends.filter((id: string) => id !== user.$id),
      }),
    ]

    return Promise.all(result).catch(() => {
      //restore documents to state before update
      databases.updateDocument(
        DATABASE_ID,
        COLLECTION_FRIENDS_ID,
        user.$id,
        docSelf,
      );
      databases.updateDocument(
        DATABASE_ID,
        COLLECTION_FRIENDS_ID,
        friendId,
        docFriend,
      );
    });
  };

  const auth = {
    signIn,
    signOut,
    signUp,
    getSession,
    getFriends,
    getLocation,
    sendFriendRequest,
    getFriendRequests,
    cancelFriendRequest,
    declineFriendRequest,
    removeFriend,
    loggedIn,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
