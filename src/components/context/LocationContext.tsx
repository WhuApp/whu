import { Location, TimedLocation } from '../../types';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useInterval } from '../../hooks';
import useLocationsV1 from '../../services/locations_v1';
import { calculateDistance } from '../../utils/location';
import { Alert } from 'react-native';
import { Magnetometer, MagnetometerMeasurement } from 'expo-sensors';
import { Accuracy, LocationObject, LocationSubscription, watchPositionAsync } from 'expo-location';
import { toDegrees, wrap } from '../../utils/math';

const UPLOAD_DELAY = 1000 * 10; // 10 seconds
const UPLOAD_DISTANCE_INTERVAL = 10; // measured in metres
const UPLOAD_MAX_DELAY = 1000 * 60 * 5; // 5 minutes

const MAGNETOMETER_UPDATE_INTERVAL = 50; // milliseconds

const LOCATION_UPDATE_INTERVAL = 1000; // 1 second
const LOCATION_DISTANCE_INTERVAL = 1; // measured in metres

const useLiveLocation = () => {
  const [location, setLocation] = useState<Location>();

  const updateLocation = (data: LocationObject) => {
    setLocation({
      longitude: data.coords.longitude,
      latitude: data.coords.latitude,
      altitude: data.coords.altitude,
    });
  };

  useEffect(() => {
    let subscription: LocationSubscription;

    (async () => {
      subscription = await watchPositionAsync(
        {
          accuracy: Accuracy.High, // <= 10m accuracy
          timeInterval: LOCATION_UPDATE_INTERVAL,
          distanceInterval: LOCATION_DISTANCE_INTERVAL,
        },
        updateLocation
      );
    })();

    return () => {
      subscription.remove();
    };
  }, []);

  return location;
};

const useMagneticHeading = () => {
  const [heading, setHeading] = useState<number>(0);

  const updateHeading = ({ x, y }: MagnetometerMeasurement) => {
    const radians = Math.atan2(x, y);

    setHeading(wrap(toDegrees(radians), -180, 180));
  };

  useEffect(() => {
    const listener = Magnetometer.addListener(updateHeading);

    Magnetometer.setUpdateInterval(MAGNETOMETER_UPDATE_INTERVAL);

    return () => {
      listener.remove();
    };
  }, []);

  return heading;
};

type LocationContextInterface = {
  location: Location;
  heading: number;
};

const initialContext: LocationContextInterface = {
  location: undefined,
  heading: 0,
};

const LocationContext = createContext<LocationContextInterface>(initialContext);

const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLiveLocation();
  const heading = useMagneticHeading();

  const [lastLocation, setLastLocation] = useState<TimedLocation>();
  const locationsService = useLocationsV1();

  // Upload location
  useInterval(() => {
    if (!location) {
      return;
    }

    const payload = { ...location, timestamp: Date.now() };

    if (
      !lastLocation ||
      calculateDistance(lastLocation, location) > UPLOAD_DISTANCE_INTERVAL ||
      payload.timestamp - lastLocation.timestamp >= UPLOAD_MAX_DELAY
    ) {
      locationsService.setLocation(payload).then((reason) => {
        if (reason) {
          Alert.alert(reason);
        } else {
          setLastLocation(payload);
        }
      });
    }
  }, UPLOAD_DELAY);

  return (
    <LocationContext.Provider value={{ location, heading }}>{children}</LocationContext.Provider>
  );
};

const useLocation = () => useContext(LocationContext);

export { LocationContext, LocationProvider };
export default useLocation;
