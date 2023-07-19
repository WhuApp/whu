import React, { useEffect, useState } from 'react';
import {
  Account,
  ID,
  Models,
  Functions,
} from 'appwrite';
import { currentTimedLocationAsync } from '../location';
import { client } from '../appwrite';

const FUNCTION_SETUP_USER_ID = '64b820cd88e01612a887';

const functions = new Functions(client);
const account = new Account(client);
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
    await account.create(ID.unique(), mail, password, name);
    const session = await account.createEmailSession(mail, password);

    const payload = JSON.stringify({ data: await currentTimedLocationAsync() });
    const execution = await functions.createExecution(FUNCTION_SETUP_USER_ID, payload);
    const data = JSON.parse(execution.response);
    
    if (data.success) {
      setSession(session);
    } else {
      return data.message;
    }
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
