import React, { useEffect, useState } from 'react';
import { Account, ID, Models } from 'appwrite';
import { client } from '../api/appwrite';
import { userExists } from '../api/functions';

const account = new Account(client);
const AuthContext = React.createContext(null);

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Models.Session | undefined>();

  useEffect(() => {
    account.getSession('current').then(
      (current) => setSession(current),
      () => setSession(null)
    );
  }, []);

  const signIn = async (email: string, password: string): Promise<string | never> => {
    try {
      setSession(await account.createEmailSession(email, password));
    } catch (reason) {
      return reason.toString();
    }
  };

  const signOut = async () => {
    await account.deleteSession('current');
    setSession(null);
  };

  const signUp = async (name: string, email: string, password: string): Promise<string | never> => {
    try {
      if ((await userExists({ name })).data.exists) {
        return 'Name unavailable';
      }

      await account.create(ID.unique(), email, password, name);
      return await signIn(email, password);
      // TODO: Create location document
    } catch (reason) {
      return reason.toString();
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
