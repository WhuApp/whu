import React, { useEffect, useState } from 'react';
import { useColors, useInterval } from '../hooks';
import { StyleSheet, View } from 'react-native';
import { BaseLayout } from '../layouts';
import { Text } from 'react-native';
import useUsersV1, { UserInfo } from '../services/users_v1';
import useLocationsV1 from '../services/locations_v1';
import { RootStackParamList, TimedLocation } from '../types';
import Icon from '../atoms/Icon';
import { calculateBearing, calculateDistance } from '../utils/location';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { IconButton } from '../components';
import useLocation from '../components/context/LocationContext';

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

  const usersContext = useUsersV1();
  const locationsContext = useLocationsV1();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [userLocation, setUserLocation] = useState<TimedLocation>();

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

  useEffect(() => {
    (async () => {
      setUserInfo(await usersContext.getUserInfo(userId));
    })();
  }, []);

  // TODO: First call on init
  useInterval(() => {
    (async () => {
      setUserLocation(await locationsContext.getLocation(userId));
    })();
  }, UPDATE_DELAY);

  // TODO: Loading indicator or something
  if (!location || !heading || !userInfo || !userLocation) {
    return (
      <BaseLayout backgroundColor={colors('accent')} statusBarStyle={'light'}>
        <Text style={styles.title}>Loading {userId}...</Text>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout backgroundColor={colors('accent')} statusBarStyle={'light'}>
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Tracking</Text>
          <Text style={styles.name}>{userInfo.nickname}</Text>
        </View>
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
          <Icon name='arrow-up' size={200} color={'white'} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.distance}>
            {Math.floor(calculateDistance(location, userLocation))}{' '}
            <Text style={styles.unit}>m</Text>
          </Text>
          <IconButton icon={'x'} onPress={navigation.goBack} padding={15} />
        </View>
      </View>
    </BaseLayout>
  );
};

export default CompassView;
