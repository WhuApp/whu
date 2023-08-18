export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Home: undefined;
  AddFriends: undefined;
  Profile: undefined;
  Settings: undefined;
  DevPage: undefined;
};

export type Friend = {
  id: string;
  username: string;
};

export type Location = {
  longitude: number;
  latitude: number;
  altitude: number;
};

export type PendingRequests = {
  outgoing: string[];
  incoming: string[];
};
