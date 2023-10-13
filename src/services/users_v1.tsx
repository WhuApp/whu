import React, { PropsWithChildren, createContext, useContext, useEffect } from 'react';
import useAuth from '../components/context/AuthContext';
import { Service } from './fetch';

export type UserInfo = {
  user_id: string;
  email: string;
  nickname: string;
};

export class UsersV1 extends Service {
  constructor(token: string) {
    super(token, 'https://api.whu.app/users/v1/');
  }

  async getUserInfo(id?: string): Promise<UserInfo> {
    const path = id ? 'by-id/' + id : 'me';
    return await this.innerFetch<UserInfo>(path);
  }

  async findUserByNickname(nickname: string): Promise<string[]> {
    return await this.innerFetch<string[]>('search/by-nickname/' + nickname);
  }
}

const UsersV1Context = createContext<UsersV1>(undefined);
const UsersV1Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const { idToken } = useAuth();
  const c = new UsersV1(undefined);
  c.token = idToken;

  useEffect(() => {
    c.token = idToken;
  }, [idToken]);

  return <UsersV1Context.Provider value={c}>{children}</UsersV1Context.Provider>;
};

const useUsersV1 = () => useContext(UsersV1Context);

export { UsersV1Context, UsersV1Provider };
export default useUsersV1;
