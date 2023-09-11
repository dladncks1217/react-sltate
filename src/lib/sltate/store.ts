export type SetStateCallbackType<T> = (prevState: T) => T; // setState 시에 (prev) => [...prev, 변경된 값] 형태로 사용할 수 있도록 하는 콜백함수 타입

export interface StoreObserverInterface<T> {
  setState: (param: SetStateCallbackType<T> | T) => void;
  getState: () => T;
  subscribe: (listener: () => void) => () => void;
  emitChange: () => void;
}

class Store<T> implements StoreObserverInterface<T> {
  public state: T;
  private listeners: Array<() => void> = []; // 특정 컴포넌트에서 상태가 변경되었음을 알려줘야 하기 때문에 배열로.

  constructor(initialState: T) {
    this.state = initialState;
  }

  // 변경된 상태 적용
  setState = (param: SetStateCallbackType<T> | T) => {
    if (param instanceof Function) {
      this.state = param(this.state);
    } else {
      this.state = param;
    }

    this.emitChange();
  };

  getState = () => {
    return this.state;
  };

  subscribe = (listener: () => void) => {
    this.listeners = [...this.listeners, listener];

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };

  // 구독하고있는 모든 컴포넌트가 상태가 변경된채로 다 재호출
  emitChange = () => {
    for (const listeners of this.listeners) {
      listeners();
    }
  };
}

export default Store;
