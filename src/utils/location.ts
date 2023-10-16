import type { Location } from '../types';

// https://www.movable-type.co.uk/scripts/latlong.html
export const calculateDistance = (from: Location, to: Location) => {
  // x = longitude
  // y = latitude
  const earthRadius = 6371.071e3; // metres
  const fromY = (from.latitude * Math.PI) / 180; // φ, λ in radians
  const toY = (to.latitude * Math.PI) / 180;
  const yDelta = ((to.latitude - from.latitude) * Math.PI) / 180;
  const xDelta = ((to.longitude - from.longitude) * Math.PI) / 180;

  const yDeltaHalfSin = Math.sin(yDelta / 2);
  const xDeltaHalfSin = Math.sin(xDelta / 2);
  const a =
    yDeltaHalfSin * yDeltaHalfSin + Math.cos(fromY) * Math.cos(toY) * xDeltaHalfSin * xDeltaHalfSin;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = earthRadius * c; // in metres

  return d;
};

export const calculateBearing = (from: Location, to: Location) => {
  //to radians
  // x = longitude
  // y = latitude
  const fromX = (from.longitude * Math.PI) / 180;
  const fromY = (from.latitude * Math.PI) / 180;
  const toX = (to.longitude * Math.PI) / 180;
  const toY = (to.latitude * Math.PI) / 180;

  const toYCos = Math.cos(toY);

  const y = Math.sin(toX - fromX) * toYCos;
  const x = Math.cos(fromY) * Math.sin(toY) - Math.sin(fromY) * toYCos * Math.cos(toX - fromX);

  return (Math.atan2(y, x) + 2 * Math.PI) % (2 * Math.PI);
};

export const formatDistance = (meters: number): { value: string; unit: 'm' | 'km' } => {
  const kilometers = meters / 1000;

  if (meters < 10000) {
    return { value: meters.toString(), unit: 'm' };
  }

  if (meters >= 1000 * 9999) {
    return { value: '>9999', unit: 'km' };
  }

  return {
    value: kilometers >= 1000 ? kilometers.toFixed(0) : kilometers.toFixed(2),
    unit: 'km',
  };
};
