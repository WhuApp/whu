import React, { PropsWithChildren, createContext, useContext, useEffect } from 'react';
import useAuth from '../components/context/AuthContext';
import { Service } from './fetch';

export class FriendsV1 extends Service {
  constructor(token: string) {
    super(token, 'https://api.whu.app/friends/v1/');
  }

  async getFriendIds(): Promise<string[]> {
    return await this.innerFetch<string[]>('list');
  }

  async getOutgoingFriendRequests(): Promise<string[]> {
    return await this.innerFetch<string[]>('requests/out/list');
  }

  async getIncomingFriendRequests(): Promise<string[]> {
    return await this.innerFetch<string[]>('requests/in/list');
  }

  async sendFriendRequestTo(id: string): Promise<string | undefined> {
    return await this.request(id, 'send');
  }

  async acceptRequest(id: string): Promise<string | undefined> {
    return await this.request(id, 'accept');
  }

  async declineRequest(id: string): Promise<string | undefined> {
    return await this.request(id, 'ignore');
  }

  async cancelRequest(id: string): Promise<string> {
    return await this.request(id, 'cancel');
  }

  async request(id: string, option: string): Promise<string | undefined> {
    const response = await this.innerFetchPost('requests/' + option, {
      friendId: id,
    });

    if (response.ok) {
      return null;
    }
    return await response.text();
  }
}

const FriendsV1Context = createContext<FriendsV1>(undefined);
const FriendsV1Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const { idToken } = useAuth();
  const c = new FriendsV1(undefined);
  c.token = idToken;

  useEffect(() => {
    c.token = idToken;
  }, [idToken]);

  return <FriendsV1Context.Provider value={c}>{children}</FriendsV1Context.Provider>;
};

const useFriendsV1 = () => useContext(FriendsV1Context);

export { FriendsV1Context, FriendsV1Provider };
export default useFriendsV1;
