import type { Location } from '../types';

// https://www.movable-type.co.uk/scripts/latlong.html
export const calculateDistance = (from: Location, to: Location) => {
  const R = 6371.071e3; // metres
  const φ1 = (from.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (to.latitude * Math.PI) / 180;
  const Δφ = ((to.latitude - from.latitude) * Math.PI) / 180;
  const Δλ = ((to.longitude - from.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // in metres

  return d;
};

export const calculateBearing = (from: Location, to: Location) => {
  const φ1 = (from.latitude * Math.PI) / 180; // φ, λ in radians
  const φ2 = (to.latitude * Math.PI) / 180;
  const λ1 = (from.longitude * Math.PI) / 180; // φ, λ in radians
  const λ2 = (to.longitude * Math.PI) / 180;

  const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);

  // Radians
  const θ = Math.atan2(y, x);

  // Degrees
  // const brng = ((θ * 180) / Math.PI + 360) % 360;

  return θ;
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
