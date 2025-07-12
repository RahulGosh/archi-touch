import { useState, useEffect } from 'react';

const useCountUp = (endValue, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration / 50); // Adjust 50ms as the interval

    const handleCount = () => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(start));
      }
    };

    const interval = setInterval(handleCount, 50);

    return () => clearInterval(interval);
  }, [endValue, duration]);

  return count;
};

export default useCountUp;