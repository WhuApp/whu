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
  location: TimedLocation;
};

export type Location = {
  longitude: number;
  latitude: number;
  altitude: number;
};

export type TimedLocation = Location & {
  timestamp: Date | number;
};

export type PendingRequests = {
  outgoing: string[];
  incoming: string[];
};
