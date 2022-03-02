import { useEffect, useState, useRef, useCallback } from 'react';

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
    return () => void 0;
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

export function useLoading<T extends (...args: any[]) => any>(cb: T): any {
  const [loading, setLoading] = useState<boolean>(false);
  const arg = useRef<any[]>();
  useEffect(() => {
    async function work() {
      try {
        await cb(...arg.current);
      } catch (error) {
        // ingore
      } finally {
        setLoading(false);
      }
    }
    if (loading) {
      work();
    }
  }, [loading]);
  return [
    loading,
    (...args) => {
      arg.current = args;
      setLoading(true);
    },
  ];
}

interface UseBoolFn {
  setTrue: () => void;
  setFalse: () => void;
}

export function useBoolean(initBool?: boolean): [boolean, UseBoolFn] {
  const [bool, setBool] = useState<boolean>(initBool);
  const setTrue = () => setBool(true);
  const setFalse = () => setBool(false);
  return [bool, { setTrue, setFalse }];
}

type MergeStateType<T> = T | (() => T);

export function useSetState<T extends Record<string, any>>(initState: MergeStateType<T>) {
  const [state, setState] = useState<T>(() => {
    if (typeof initState === 'function') return initState();
    return initState;
  });

  const mergeState = useCallback((newStateArg: Partial<MergeStateType<T>>) => {
    const newState = typeof newStateArg === 'function' ? newStateArg() : newStateArg;
    setState((preState) => {
      return {
        ...preState,
        ...newState,
      };
    });
  }, []);

  return [state, mergeState];
}
