import React from 'react';
import { Button } from '../components';
import { useAuth0 } from 'react-native-auth0';
import { ActivityIndicator, Alert, Text } from 'react-native';
import { useColors } from '../hooks';
import { BaseLayout } from '../layouts';
import { gql, useQuery } from 'urql';

const Profile: React.FC = () => {
  const { clearSession } = useAuth0();
  const [self, reloadSelf] = useQuery({
    query: gql`
      query {
        me {
          id
          email
        }
      }
    `,
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
