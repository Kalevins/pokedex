import { useState, useEffect } from 'react';

type UseLocalStorageReturn = [number[], (value: number[]) => void];

export const useLocalStorage = (key: string): UseLocalStorageReturn => {
  const [state, setState] = useState<number[]>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  });

  const setLocalStorage = (value: number[]) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  }

  useEffect(() => {
    const handleStorageChange = () => {
      const item = window.localStorage.getItem(key);
      setState(item ? JSON.parse(item) : []);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [state, setLocalStorage];
}
