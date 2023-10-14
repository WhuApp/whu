import { Location } from '../../types';
import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useInterval, useLiveHeading, useLiveLocation } from '../../hooks';
import useLocationsV1 from '../../services/locations_v1';
import { calculateDistance } from '../../utils/location';
import { Alert } from 'react-native';

const LOCATION_UPLOAD_DELAY = 1000 * 10; // 10 seconds
const LOCATION_UPLOAD_DISTANCE_INTERVAL = 10; // measured in metres

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
  const heading = useLiveHeading();

  const [lastLocation, setLastLocation] = useState<Location>();
  const locationsService = useLocationsV1();

  useInterval(() => {
    if (!location) {
      return;
    }

    const temp = location;
    const payload = { ...temp, timestamp: Date.now() };

    if (
      !lastLocation ||
      calculateDistance(lastLocation, location) > LOCATION_UPLOAD_DISTANCE_INTERVAL
    ) {
      locationsService.setLocation(payload).then((reason) => {
        if (reason) {
          Alert.alert(reason);
        } else {
          setLastLocation(temp);
        }
      });
    }
  }, LOCATION_UPLOAD_DELAY);

  return (
    <LocationContext.Provider value={{ location, heading }}>{children}</LocationContext.Provider>
  );
};

const useLocation = () => useContext(LocationContext);

export { LocationContext, LocationProvider };
export default useLocation;
