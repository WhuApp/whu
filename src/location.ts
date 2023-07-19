import type { Location, TimedLocation } from './types';
import { getCurrentPositionAsync, Accuracy } from 'expo-location';

/*
Functions calculateDistance & calculateBearing were taken from
https://www.movable-type.co.uk/scripts/latlong.html
*/

export const currentTimedLocationAsync = async (): Promise<TimedLocation> => {
  const location = await getCurrentPositionAsync({
    accuracy: Accuracy.Lowest,
    mayShowUserSettingsDialog: true,
  });

  return {
    timestamp: new Date().getTime(),
    ...normalize({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
    }),
  };
};

//optimizable (while loops)
const normalize = (location: Location): Location => {
  let longitude = location.longitude;
  let latitude = location.latitude;

  while (longitude > 90 || longitude < -90) {
    if (longitude > 90) longitude = 180 - longitude;
    if (longitude < -90) longitude = -180 - longitude;
    latitude += 180;
  }
  while (latitude > 180 || latitude < -180) {
    if (latitude > 180) latitude -= 360;
    if (latitude < -180) latitude += 360;
  }

  return {
    longitude: longitude / 90,
    latitude: latitude / 180,
    altitude: location.altitude / 100000,  // max height 100 000 meters
  };
};

export const denormalize = (location: TimedLocation): TimedLocation => ({
  timestamp: new Date(location.timestamp),
  longitude: location.longitude * 90,
  latitude: location.latitude * 180,
  altitude: location.altitude * 100000,
});

export const calculateDistance = (from: Location, to: Location) => {
  const R = 6371.0710e3; // metres
  const φ1 = from.latitude * Math.PI / 180; // φ, λ in radians
  const φ2 = to.latitude * Math.PI / 180;
  const Δφ = (to.latitude - from.latitude) * Math.PI / 180;
  const Δλ = (to.longitude - from.longitude) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + 
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // in metres 

  return d;
};

export const calculateBearing = (from: Location, to: Location) => {
  const φ1 = from.latitude * Math.PI / 180; // φ, λ in radians
  const φ2 = to.latitude * Math.PI / 180;
  const λ1 = from.longitude * Math.PI / 180; // φ, λ in radians
  const λ2 = to.longitude * Math.PI / 180;

  const y = Math.sin(λ2-λ1) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) -
            Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2-λ1);
  const θ = Math.atan2(y, x);
  const brng = (θ * 180 / Math.PI + 360) % 360; // in degrees

  return brng;
};
