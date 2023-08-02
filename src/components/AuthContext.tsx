import React, { useEffect, useState } from 'react';
import { Account, Models } from 'appwrite';
import { client } from '../appwrite';
import { register, login } from '../api/functions';

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

  const signIn = async (emailOrName: string, password: string): Promise<string | never> => {
    const response = await login({ emailOrName, password });

    if (!response.success) {
      return response.error ?? 'Unknown Error';
    }

    setSession(response.data.session);
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
