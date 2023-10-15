export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Home: undefined;
  AddFriends: undefined;
  Profile: undefined;
  Settings: undefined;
  DevPage: undefined;
  CompassView: { userId: string };
};

export type TimedLocation = Location & { timestamp: number };

export type Location = {
  latitude: number;
  longitude: number;
  altitude: number;
};

export type User = {
  user_id: string; // TODO: rename this property
  email: string;
  nickname: string;
};
