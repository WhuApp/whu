import React, { useEffect, useState } from 'react';
import { Account, Models } from 'appwrite';
import { client } from '../appwrite';
import { register } from '../api/functions';

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
    const response = await register({ name, email, password });

    if (!response.success) {
      return response.error ?? 'Unknown Error';
    }

    return await signIn(email, password);
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
