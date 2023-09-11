import { useSyncExternalStore } from "react";
import Store from "./store";

import { StoreObserverInterface, SetStateCallbackType } from "./store";

export const SltateStore = <T>(initialState: T) => {
  const storeManager = new Store<T>(initialState);

  return storeManager;
};

export const useSltateState = <T>(store: StoreObserverInterface<T>) => {
  const { subscribe, setState, getState } = store;
  const state = useSyncExternalStore(subscribe, getState);

  return [state, setState];
};

export const useSetSltateValue = <T>(store: StoreObserverInterface<T>) => {
  const { setState } = store;

  return setState;
};

export const useSltateValue = <T>(store: StoreObserverInterface<T>) => {
  const { subscribe, getState } = store;
  const state = useSyncExternalStore(subscribe, getState);

  return state;
};
