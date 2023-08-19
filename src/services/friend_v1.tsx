import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { responseWithJsonSafe } from '../utils/safe_json';
import useAuth from '../auth';

const BASE_URL = 'https://api.whu.app/friends/v1/';

export class FriendV1 {
  token: string | Promise<string>;

  constructor(token: string | Promise<string>) {
    this.token = token;
  }

  async innerFetch<T = unknown>(path: string): Promise<T> {
    if (typeof this.token != 'string') {
      this.token = await this.token;
    }
    return await responseWithJsonSafe(BASE_URL + path, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + this.token },
    });
  }

  async innerFetchPost(path: string, body: any): Promise<Response> {
    if (typeof this.token != 'string') {
      this.token = await this.token;
    }
    const o = {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + this.token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    console.log(BASE_URL + path, o);
    return await fetch(BASE_URL + path, o);
  }

  async getFriendIds(): Promise<string[]> {
    return await this.innerFetch('list');
  }

  async getOutgoingFriendRequests(): Promise<string[]> {
    return await this.innerFetch('requests/out/list');
  }

  async getIncomingFriendRequests(): Promise<string[]> {
    return await this.innerFetch('requests/in/list');
  }

  async sendFriendRequestTo(id: string): Promise<string | undefined> {
    const response = await this.innerFetchPost('request/send', {
      friendId: id,
    });

    if (response.ok) {
      return null;
    }
    return await response.text();
  }

  async acceptRequest(id: string): Promise<string | undefined> {
    const response = await this.innerFetchPost('request/accept', {
      friendId: id,
    });

    if (response.ok) {
      return null;
    }
    return await response.text();
  }

  async declineRequest(id: string): Promise<string | undefined> {
    const response = await this.innerFetchPost('request/ignore', {
      friendId: id,
    });

    if (response.ok) {
      return null;
    }
    return await response.text();
  }

  async cancelRequest(id: string): Promise<string> {
    return 'UNIMPLEMENTED BY NOAH GERBER';
  }
}

const FriendsV1Context = createContext<FriendV1>(undefined);
const FriendsV1Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const { idToken } = useAuth();
  const c = new FriendV1(undefined);
  c.token = idToken;

  useEffect(() => {
    c.token = idToken;
  }, [idToken]);

  return <FriendsV1Context.Provider value={c}>{children}</FriendsV1Context.Provider>;
};

const useFriendV1 = () => useContext(FriendsV1Context);

export { FriendsV1Context, FriendsV1Provider };
export default useFriendV1;
