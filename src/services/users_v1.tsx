import { PropsWithChildren, createContext, useContext, useEffect } from 'react';
import useAuth from '../components/AuthContext';

const BASE_URL = 'https://api.whu.app/users/v1/';

export type UserInfo = {
  user_id: string;
  email: string;
  nickname: string;
};

export class UsersV1 {
  token: string | Promise<string>;

  constructor(token: Promise<string>) {
    this.token = token;
  }

  async innerFetch<T = unknown>(path: string): Promise<T> {
    if (typeof this.token != 'string') {
      this.token = await this.token;
    }
    const response = await fetch(BASE_URL + path, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + this.token },
    });
    return await response.json();
  }

  async getUserInfo(id: string): Promise<UserInfo> {
    return await this.innerFetch('by-id/' + id);
  }

  async findUserByNickname(nickname: string): Promise<string[]> {
    return await this.innerFetch('search/by-nickname/' + nickname);
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
