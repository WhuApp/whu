import React from 'react';
import { useColors, useInterval } from '../hooks';
import { StyleSheet, View } from 'react-native';
import { BaseLayout } from '../layouts';
import { Text } from 'react-native';
import { RootStackParamList } from '../types';
import Icon from '../atoms/Icon';
import { calculateDistance, computeHeading, formatDistance } from '../utils/location';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { IconButton } from '../components';
import useLocation from '../components/context/LocationContext';
import { User } from '../types';
import { wrap } from '../utils/math';
import { getUserById } from '../api/users';
import { getLocationById } from '../api/locations';
import { useQueryClient } from '@tanstack/react-query';

const UPDATE_DELAY = 1000 * 10; // 10 seconds

type CompassViewNavigationProp = NavigationProp<RootStackParamList, 'CompassView'>;
type CompassViewRouteProp = RouteProp<RootStackParamList, 'CompassView'>;

interface CompassViewProps {
  navigation: CompassViewNavigationProp;
  route: CompassViewRouteProp;
}

const CompassView: React.FC<CompassViewProps> = ({ navigation, route }) => {
  const { userId } = route.params;

  const { location, heading } = useLocation();

  const { data: user, isPending: userPending } = getUserById(userId);
  const { data: userLocation, isPending: userLocationPending } = getLocationById(userId);

  const queryClient = useQueryClient();

  const colors = useColors();
  const styles = StyleSheet.create({
    content: {
      padding: 15,
      height: '100%',
      justifyContent: 'space-between',
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: colors('textTertiary', 'light'),
    },
    name: {
      color: colors('textPrimary', 'dark'),
      fontSize: 30,
      fontWeight: '700',
    },
    radar: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    distance: {
      color: colors('textPrimary', 'dark'),
      fontSize: 46,
    },
    unit: {
      color: colors('textTertiary', 'light'),
    },
  });

  useInterval(() => {
    queryClient.invalidateQueries({ queryKey: ['locations', userId] });
  }, UPDATE_DELAY);

  if (!location || !heading || userPending || userLocationPending) {
    return (
      <BaseLayout backgroundColor={colors('accent')} statusBarStyle={'light'}>
        <Text style={styles.title}>Loading {userId}...</Text>
      </BaseLayout>
    );
  }

  const bearing = computeHeading(location, userLocation);
  const rotation = wrap(bearing + heading, -180, 180);
  const distance = formatDistance(calculateDistance(location, userLocation));

  return (
    <BaseLayout backgroundColor={colors('accent')} statusBarStyle={'light'}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Tracking</Text>
          <Text style={styles.name}>{user.nickname}</Text>
          <Text style={styles.title}>Heading: {bearing}</Text>
          <Text style={styles.title}>Phone: {heading}</Text>
          <Text style={styles.title}>Result: {rotation}</Text>
        </View>
        <View
          style={[
            styles.radar,
            {
              transform: [
                {
                  rotate: `${rotation}deg`,
                },
              ],
            },
          ]}
        >
          <Icon name='arrow-up' size={200} color={'white'} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.distance}>
            {distance.value} <Text style={styles.unit}>{distance.unit}</Text>
          </Text>
          <IconButton icon={'x'} onPress={navigation.goBack} padding={15} />
        </View>
      </View>
    </BaseLayout>
  );
};

export default CompassView;
