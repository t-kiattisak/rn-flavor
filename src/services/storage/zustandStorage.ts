import type { PersistStorage, StorageValue } from 'zustand/middleware';
import { mmkv } from './mmkv';

export const createZustandMMKVStorage = <S>(): PersistStorage<S> => ({
  getItem: key => {
    const value = mmkv.getString(key);
    return value ? (JSON.parse(value) as StorageValue<S>) : null;
  },
  setItem: (key, value) => {
    mmkv.set(key, JSON.stringify(value));
  },
  removeItem: key => {
    mmkv.delete(key);
  },
});
