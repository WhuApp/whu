import React, { useEffect, useState } from 'react';
import { useColors, useInterval, useLiveHeading, useLiveLocation } from '../hooks';
import { StyleSheet, View } from 'react-native';
import { BaseLayout } from '../layouts';
import { Text } from 'react-native';
import useUsersV1, { UserInfo } from '../services/users_v1';
import useLocationsV1 from '../services/locations_v1';
import { RootStackParamList, TimedLocation } from '../types';
import Icon from '../atoms/Icon';
import { calculateBearing, calculateDistance, denormalize } from '../utils/location';
import { RouteProp } from '@react-navigation/native';

const UPDATE_DELAY = 1000 * 10; // 10 seconds

type CompassViewNavigationProp = RouteProp<RootStackParamList, 'CompassView'>;

interface CompassViewProps {
  route: CompassViewNavigationProp;
}

const CompassView: React.FC<CompassViewProps> = ({ route }) => {
  const { userId } = route.params;

  const location = useLiveLocation();
  const heading = useLiveHeading();

  const usersContext = useUsersV1();
  const locationsContext = useLocationsV1();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [userLocation, setUserLocation] = useState<TimedLocation>();

  const colors = useColors();
  const styles = StyleSheet.create({
    name: {
      color: colors('textPrimary', 'dark'),
    },
    radar: {
      flexDirection: 'column',
    },
    distance: {
      color: colors('textPrimary', 'dark'),
    },
    unit: {
      color: colors('textTertiary', 'dark'),
    },
  });

  useEffect(() => {
    (async () => {
      setUserInfo(await usersContext.getUserInfo(userId));
    })();
  }, []);

  // TODO: First call on init
  useInterval(() => {
    (async () => {
      setUserLocation(denormalize(await locationsContext.getLocation(userId)));
    })();
  }, UPDATE_DELAY);

  // TODO: Loading indicator or something
  if (!location || !heading || !userInfo || !userLocation) {
    return (
      <BaseLayout>
        <Text>Loading {userId}</Text>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout backgroundColor={colors('accent')}>
      <Text style={styles.name}>{userInfo.nickname}</Text>
      <View
        style={[
          styles.radar,
          {
            transform: [
              {
                rotate: `${
                  (Math.floor(calculateBearing(location, userLocation) - heading) + 360) % 360
                }deg`,
              },
            ],
          },
        ]}
      >
        <Icon name='target' size={36} />
        <Icon name='arrow-up' size={96} />
      </View>
      <View>
        <Text style={styles.distance}>
          {Math.floor(calculateDistance(location, userLocation))}
          <Text style={styles.unit}>m</Text>
        </Text>
      </View>
    </BaseLayout>
  );
};

export default CompassView;
