import { useEffect, useState } from 'react';
import { watchPositionAsync, Accuracy } from 'expo-location';
import type { LocationObject } from 'expo-location';
import type { Location } from '../types';

// DANGER!!! This hook expects to already have permissions to get foreground location data
const useLiveLocation = () => {
  const [location, setLocation] = useState<Location>();

  const onLocationUpdate = (data: LocationObject) => {
    setLocation({
      longitude: data.coords.longitude,
      latitude: data.coords.latitude,
      altitude: data.coords.altitude,
    });
  };

  useEffect(() => {
    (async () => {
      const subscription = await watchPositionAsync(
        {
          accuracy: Accuracy.High, // <= 10m accuracy
          timeInterval: 1000,
          distanceInterval: 1,
        },
        onLocationUpdate
      );

      return () => subscription.remove();
    })();
  }, []);

  return location;
};

export default useLiveLocation;
