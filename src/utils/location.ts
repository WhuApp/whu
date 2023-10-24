import { toRadians, toDegrees, wrap } from './math';
import { Location } from '../types';

const EARTH_RADIUS = 6371009; // in meters

// https://www.movable-type.co.uk/scripts/latlong.html
export const calculateDistance = (from: Location, to: Location) => {
  // x = longitude
  // y = latitude
  const fromY = (from.latitude * Math.PI) / 180; // φ, λ in radians
  const toY = (to.latitude * Math.PI) / 180;
  const yDelta = ((to.latitude - from.latitude) * Math.PI) / 180;
  const xDelta = ((to.longitude - from.longitude) * Math.PI) / 180;

  const yDeltaHalfSin = Math.sin(yDelta / 2);
  const xDeltaHalfSin = Math.sin(xDelta / 2);
  const a =
    yDeltaHalfSin * yDeltaHalfSin + Math.cos(fromY) * Math.cos(toY) * xDeltaHalfSin * xDeltaHalfSin;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // in metres
  return EARTH_RADIUS * c;
};

// https://edwilliams.org/avform147.htm#Crs
export const computeHeading = (from: Location, to: Location) => {
  const fromLat = toRadians(from.latitude);
  const fromLong = toRadians(from.longitude);
  const toLat = toRadians(to.latitude);
  const toLong = toRadians(to.longitude);
  const deltaLong = toLong - fromLong;
  const heading = Math.atan2(
    Math.sin(deltaLong) * Math.cos(toLat),
    Math.cos(fromLat) * Math.sin(toLat) - Math.sin(fromLat) * Math.cos(toLat) * Math.cos(deltaLong)
  );

  return wrap(toDegrees(heading), -180, 180);
};

export const formatDistance = (meters: number): { value: string; unit: 'm' | 'km' } => {
  const kilometers = meters / 1000;

  if (meters < 10000) {
    return { value: Math.floor(meters).toString(), unit: 'm' };
  }

  if (meters >= 1000 * 9999) {
    return { value: '>9999', unit: 'km' };
  }

  return {
    value: kilometers >= 1000 ? kilometers.toFixed(0) : kilometers.toFixed(2),
    unit: 'km',
  };
};
