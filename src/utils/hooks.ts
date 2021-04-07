import { useEffect } from 'react';

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
