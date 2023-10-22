export const toRadians = (deg: number) => {
  return (deg / 180) * Math.PI;
};

export const toDegrees = (rad: number) => {
  return (rad * 180) / Math.PI;
};

export const mod = (a: number, b: number) => {
  return ((a % b) + b) % b;
};

export const wrap = (value: number, min: number, max: number) => {
  if (value >= min && value <= max) {
    return value;
  } else {
    return mod(value - min, max - min) + min;
  }
};
