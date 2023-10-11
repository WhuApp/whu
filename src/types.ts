export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Home: undefined;
  AddFriends: undefined;
  Profile: undefined;
  Settings: undefined;
  DevPage: undefined;
};

export type TimedLocation = Location & { timestamp: number };

export type Location = {
  latitude: number;
  longitude: number;
  altitude: number;
};
