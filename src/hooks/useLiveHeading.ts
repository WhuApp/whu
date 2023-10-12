import { useEffect, useState } from 'react';
import { watchHeadingAsync, LocationHeadingObject, LocationSubscription } from 'expo-location';

const SMOOTHNESS = 10; // the lower, the smoother
const BUFFER_SIZE = 8; // the lower, the more accurate

// DANGER!!! This hook expects to already have permissions to get foreground location data
const useLiveHeading = () => {
  const [subscription, setSubscription] = useState<LocationSubscription>();
  const [headingBuffer, setHeadingBuffer] = useState<number[]>([]);
  const [heading, setHeading] = useState<number>(0);

  const onHeadingUpdate = (data: LocationHeadingObject) => {
    setHeadingBuffer((prev) => [...prev, data.trueHeading]);
  };

  useEffect(() => {
    const averageHeading = headingBuffer.reduce((acc, val) => acc + val, 0) / headingBuffer.length;

    if (headingBuffer.length > BUFFER_SIZE) {
      setHeadingBuffer(headingBuffer.slice(1));
    }

    if (Math.abs(heading - averageHeading) > SMOOTHNESS) {
      setHeading(averageHeading);
    }
  }, [headingBuffer]);

  useEffect(() => {
    (async () => {
      if (!subscription) {
        setSubscription(await watchHeadingAsync(onHeadingUpdate));
      }

      return () => {
        subscription.remove();
        setSubscription(null);
      };
    })();
  }, []);

  return heading;
};

export default useLiveHeading;
