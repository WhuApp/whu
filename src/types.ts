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
  name: string,
  location: Location;
}

export type Location = {
  timestamp: Date,
  longitude: number,
  latitude: number,
  altitude: number,
};
