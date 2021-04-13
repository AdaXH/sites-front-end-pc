import { useEffect, useState, useRef } from 'react';

export function useDidMount(callback: Function) {
  useEffect(() => {
    callback();
  }, []);
}

export function useUnmount(callback: Function) {
  useEffect(() => {
    return () => callback();
  }, []);
}

export function useInterval(callback: Function, delay: number) {
  const savedCallback: Ref<Function> = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => {};
  }, [delay]);
}

export function useLoop(request, timeout) {
  const [result, setResult] = useState();
  const [error, setError] = useState();

  useInterval(async () => {
    try {
      const res = await request();
      setResult(res);
    } catch (e) {
      setError(e);
    }
  }, timeout);

  return [error, result];
}

export function useDebounce(value, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
