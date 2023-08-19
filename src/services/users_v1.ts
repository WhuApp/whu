import { useAuth0 } from "react-native-auth0";
import { useEffect, useState } from "react";

const BASE_URL = "https://api.whu.app/users/v1/";

export type UserInfo = {
  user_id: string;
  email: string;
  nickname: string;
};

export class UsersV1 {
  #token: string;

  constructor(token: string) {
    this.#token = token;
  }

  innerFetch(path: string): Promise<Response> {
    return fetch(BASE_URL + path, {
      headers: { Authorization: "Bearer " + this.#token },
    });
  }

  async getUserInfo(id: string): Promise<UserInfo> {
    const response = await this.innerFetch("by-id/" + id);
    return await response.json();
  }

  async findUserByNickname(nickname: string): Promise<string[]> {
    const response = await this.innerFetch("search/by-nickname/" + nickname);
    return await response.json();
  }
}

export const useUsersV1 = (): UsersV1 | undefined => {
  const { user, getCredentials } = useAuth0();
  const [jwt, setJwt] = useState(undefined);

  useEffect(() => {
    getCredentials().then((c) => setJwt(c.idToken));
  }, [user]);

  if (jwt) {
    return new UsersV1(jwt);
  } else {
    return undefined;
  }
};
