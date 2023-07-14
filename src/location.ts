type GeoPoint = {
  longitude: number;
  latitude: number;
  altitude: number;
};

//optimizable (while loops)
function normalizeCoordinates(raw: GeoPoint): GeoPoint {
  let longitude = raw.longitude;
  let latitude = raw.latitude;

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
    altitude: raw.altitude / 100000,  //max height 100 000 meters
  };
}

function denormalizeCoordiantes(normalized: GeoPoint): GeoPoint {
  return {
    longitude: normalized.longitude * 90,
    latitude: normalized.latitude * 180,
    altitude: normalized.altitude * 100000,
  };
}

//https://www.movable-type.co.uk/scripts/latlong.html
function calculateDistance(from: GeoPoint, to: GeoPoint) {
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
}

//https://www.movable-type.co.uk/scripts/latlong.html
function calculateBearing(from: GeoPoint, to: GeoPoint) {
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
}

export { normalizeCoordinates, denormalizeCoordiantes, GeoPoint };
