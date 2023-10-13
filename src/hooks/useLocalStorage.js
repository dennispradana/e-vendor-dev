import { useState, useEffect } from 'react';

function getStorageValue(key) {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial;
}

export const useLocalStorage = (key) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
