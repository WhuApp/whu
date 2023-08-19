import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useAuth0 } from 'react-native-auth0';

export type AuthContextInterface = {
  idToken: string | Promise<string>;
};

const initialContext: AuthContextInterface = {
  idToken: undefined,
};

const AuthContext = createContext<AuthContextInterface>(initialContext);
const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, getCredentials } = useAuth0();
  const [idToken, setIdToken] = useState(getCredentials().then((c) => c.idToken));

  useEffect(() => {
    setIdToken(getCredentials().then((c) => c.idToken));
  }, [user]);

  return <AuthContext.Provider value={{ idToken }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider };
export default useAuth;
