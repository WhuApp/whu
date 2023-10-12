import { Location } from '../types';
import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useLiveHeading, useLiveLocation } from '../hooks';

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
  // TODO: Create hooks in this file so they cant be used otherwise
  const location = useLiveLocation();
  const heading = useLiveHeading();

  return (
    <LocationContext.Provider value={{ location, heading }}>{children}</LocationContext.Provider>
  );
};

const useLocation = () => useContext(LocationContext);

export { LocationContext, LocationProvider };
export default useLocation;
