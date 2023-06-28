import { useEffect, useState } from 'react';
import { Account, Client, ID } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('648644a80adadf63b7d4');

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const account = new Account(client);

  useEffect(() => {
    const init = async () => {
      try {
        await account.get();

        setLoggedIn(true);
        setLoading(false);
      } catch(e) {
        setLoggedIn(false);
        setLoading(false);
      };
    };

    init();
  }, []);

  useEffect(() => {
    console.log('Changed auth state', loggedIn);
  }, [loggedIn])

  const signIn = (mail: string, password: string) => {
    return account.createEmailSession(mail, password)
      .then((res) => { setLoggedIn(true); return res; });
  };

  const signOut = () => {
    return account.deleteSessions() // TODO use deleteSession(...)
      .then((res) => { setLoggedIn(false); return res; });
  };

  // really big int
  const signUp = (name, mail, password) => {
    return account.create(ID.unique(), mail, password, name)
      .then(() => signIn(mail, password));
  };

  const getSession = () => account.get();

  return { signIn, signOut, signUp, getSession, loggedIn, loading };
}

export default useAuth;
