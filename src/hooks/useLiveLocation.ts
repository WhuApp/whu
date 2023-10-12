import { useEffect, useState } from 'react';
import { watchPositionAsync, Accuracy, LocationSubscription, LocationObject } from 'expo-location';
import { Location } from '../types';

const UPDATE_INTERVAL = 1000; // 1 second
const DISTANCE_INTERVAL = 1; // measured in metres

// DANGER!!! This hook expects to already have permissions to get foreground location data
const useLiveLocation = () => {
  const [subscription, setSubscription] = useState<LocationSubscription>();
  const [location, setLocation] = useState<Location>();

  const onLocationUpdate = (data: LocationObject) => {
    // console.log('Updated location');

    setLocation({
      longitude: data.coords.longitude,
      latitude: data.coords.latitude,
      altitude: data.coords.altitude,
    });
  };

  useEffect(() => {
    (async () => {
      if (!subscription) {
        setSubscription(
          await watchPositionAsync(
            {
              accuracy: Accuracy.High, // <= 10m accuracy
              timeInterval: UPDATE_INTERVAL,
              distanceInterval: DISTANCE_INTERVAL,
            },
            onLocationUpdate
          )
        );
      }

      return () => {
        subscription.remove();
        setSubscription(null);
      };
    })();
  }, []);

  return location;
};

export default useLiveLocation;
