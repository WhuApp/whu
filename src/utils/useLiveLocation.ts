import { useEffect, useState } from 'react';
import { watchPositionAsync, Accuracy } from 'expo-location';
import type { LocationObject } from 'expo-location';
import type { TimedLocation } from '../types';

// DANGER!!! This hook expects to already have permissions to get foreground location data
const useLiveLocation = () => {
  const [location, setLocation] = useState<TimedLocation>();

  const onLocationUpdate = (data: LocationObject) => {
    setLocation({
      timestamp: new Date(data.timestamp),
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
