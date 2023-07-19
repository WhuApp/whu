import { useEffect, useState } from 'react';
import { watchHeadingAsync } from 'expo-location';
import type { LocationHeadingObject } from 'expo-location';

// DANGER!!! This hook expects to already have permissions to get foreground location data
const useLiveHeading = () => {
  const [heading, setHeading] = useState<number>();

  const onHeadingUpdate = (data: LocationHeadingObject) => {
    setHeading(data.trueHeading);
  };

  useEffect(() => {
    (async () => {
      const subscription = await watchHeadingAsync(onHeadingUpdate);

      return () => subscription.remove();
    })();
  }, []);

  return heading;
};

export default useLiveHeading;
