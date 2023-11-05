import React from 'react';
import { Button } from '../components';
import { useAuth0 } from 'react-native-auth0';
import { ActivityIndicator, Alert, Text } from 'react-native';
import { useColors } from '../hooks';
import { BaseLayout } from '../layouts';
import { useQuery } from 'urql';
import { graphql } from '../gql';

const ProfileRootQuery = graphql(`
  query ProfileRootQuery {
    me {
      id
      email
    }
  }
`);

const Profile: React.FC = () => {
  const { clearSession } = useAuth0();
  const [self, reloadSelf] = useQuery({
    query: ProfileRootQuery,
  });

  const colors = useColors();

  const handleSignOut = () => {
    clearSession({}, {}).catch((e) => Alert.alert(e));
  };

  // Loading state
  if (self.fetching) {
    return <ActivityIndicator />;
  }

  return (
    <BaseLayout>
      <Text style={{ color: colors('textPrimary') }}>Signed in as {self.data?.me.email}</Text>
      <Button title='Sign Out' onPress={handleSignOut} />
    </BaseLayout>
  );
};

export default Profile;
