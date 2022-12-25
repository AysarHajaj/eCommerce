import { useEffect, useRef } from 'react';

export default (value) => {
  const ref = useRef();
  const prevRef = useRef();

  useEffect(() => {
    prevRef.current = ref.current;
    ref.current = value;
  }, [value]);

  return prevRef.current;
};
