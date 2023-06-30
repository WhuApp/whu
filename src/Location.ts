type GeoPoint = {
  longitude: number;
  latitude: number;
  altitude: number;
};

function normalizeLatitude(raw: GeoPoint): GeoPoint {
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
    altitude: raw.altitude,
  };
}

export { normalizeLatitude };
