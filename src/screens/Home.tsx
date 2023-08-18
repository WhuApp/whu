import React from "react";
import { Text } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { FriendList } from "../components";

const Home: React.FC = () => {
  const { user } = useAuth0();

  return (
    <>
      <Text>Logged in as {user.name}</Text>
      <FriendList />
    </>
  );
};

export default Home;
