type GeoPoint = {
  longitude: number;
  latitude: number;
  altitude: number;
};

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
    altitude: raw.altitude / 100000,
  };
}

function denormalizeCoordiantes(normalized: GeoPoint): GeoPoint {
  return {
    longitude: normalized.longitude * 90,
    latitude: normalized.latitude * 180,
    altitude: normalized.altitude * 100000,
  };
}

export { normalizeCoordinates, denormalizeCoordiantes, GeoPoint };
