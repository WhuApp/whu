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

  async getFriendIds(): Promise<string[]> {
    const list = await this.innerFetch("list");
    return await list.json();
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
