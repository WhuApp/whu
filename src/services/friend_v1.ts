import { useAuth0 } from "react-native-auth0";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.whu.app/friends/v1/";

export type FriendInfo = {};

export class FriendV1 {
  #token: string;

  constructor(token: string) {
    this.#token = token;
  }

  innerFetch(path: string): Promise<Response> {
    return fetch(BASE_URL + path, {
      headers: { Authorization: "Bearer " + this.#token },
    });
  }

  innerFetchPost(path: string, body: any): Promise<Response> {
    return fetch(BASE_URL + path, {
      method: "POST",
      headers: { Authorization: "Bearer " + this.#token },
      body: JSON.stringify(body),
    });
  }

  async getFriendIds(): Promise<string[]> {
    const list = await this.innerFetch("list");
    return await list.json();
  }

  async getOutgoingFriendRequests(): Promise<string[]> {
    const list = await this.innerFetch("requests/out/list");
    return await list.json();
  }

  async getIncomingFriendRequests(): Promise<string[]> {
    const list = await this.innerFetch("requests/in/list");
    return await list.json();
  }

  async sendFriendRequestTo(id: string): Promise<string | undefined> {
    const response = await this.innerFetchPost("request/send", {
      friendId: id,
    });

    if (response.ok) {
      return null;
    }
    return await response.text();
  }

  async acceptRequest(id: string): Promise<string | undefined> {
    const response = await this.innerFetchPost("request/accept", {
      friendId: id,
    });

    if (response.ok) {
      return null;
    }
    return await response.text();
  }

  async declineRequest(id: string): Promise<string | undefined> {
    const response = await this.innerFetchPost("request/ignore", {
      friendId: id,
    });

    if (response.ok) {
      return null;
    }
    return await response.text();
  }

  async cancelRequest(id: string): Promise<string | undefined> {
    return "UNIMPLEMENTED BY NOAH GERBER";
  }
}

export const useFriendsV1 = (): FriendV1 | undefined => {
  const { user, getCredentials } = useAuth0();
  const [jwt, setJwt] = useState(undefined);

  useEffect(() => {
    getCredentials().then((c) => setJwt(c.idToken));
  }, [user]);

  if (jwt) {
    return new FriendV1(jwt);
  } else {
    return undefined;
  }
};
