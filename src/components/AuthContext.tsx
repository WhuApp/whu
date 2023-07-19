import React, { useEffect, useState } from 'react';
import {
  Account,
  Databases,
  ID,
  Models,
  Permission,
  Role,
} from 'appwrite';
import { currentTimedLocationAsync } from '../location';
import { client } from '../appwrite';

const DATABASE_ID = '6488df9565380dad0d54';
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

    await createUserDocument(user.$id);
    setSession(session);
  };

  // TODO: Create a appwrite function for signup proccess
  const createUserDocument = async (id: string) => {
    const data = await currentTimedLocationAsync();
    const permissions = [
      Permission.read(Role.user(id)),
      Permission.update(Role.user(id)),
      Permission.delete(Role.user(id)),
      Permission.write(Role.user(id)),
    ];
    const document = await databases.createDocument(DATABASE_ID, COLLECTION_LOCATION_ID, id, data, permissions);

    return document;
  };

  const auth = {
    session,
    signIn,
    signOut,
    signUp,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
