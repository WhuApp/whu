export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Home: undefined;
  AddFriends: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type Friend = {
  name: string;
  lastLocationUpdate: Date;
  location: Location;
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
