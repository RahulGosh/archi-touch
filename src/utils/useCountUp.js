import { useState, useEffect } from 'react';

const useCountUp = (endValue, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (endValue === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const increment = endValue / (duration / 60); // 60fps
    let animationFrame;

    const handleCount = () => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
      } else {
        setCount(Math.ceil(start));
        animationFrame = requestAnimationFrame(handleCount);
      }
    };

    animationFrame = requestAnimationFrame(handleCount);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [endValue, duration]);

  return count;
};

export default useCountUp;