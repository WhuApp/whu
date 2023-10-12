import { useEffect, useRef } from 'react';

const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    callback();
  }, []);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
