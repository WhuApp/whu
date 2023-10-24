export const toRadians = (deg: number) => {
  return (deg / 180) * Math.PI;
};

export const toDegrees = (rad: number) => {
  return (rad * 180) / Math.PI;
};

/**
 * Returns the non-negative remainder of a / b
 */
export const mod = (a: number, b: number) => {
  return ((a % b) + b) % b;
};

/**
 * Wraps the given value into the inclusive-exclusive interval between min and max
 */
export const wrap = (value: number, min: number, max: number) => {
  if (value >= min && value <= max) {
    return value;
  } else {
    return mod(value - min, max - min) + min;
  }
};
