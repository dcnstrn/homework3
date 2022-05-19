import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import {CounterContext} from './context';

const CounterProvider = ({children}: {children: ReactElement}) => {
  const [counter, setCounter] = useState<number>(0);

  const increase = useCallback(() => {
    setCounter(prev => prev + 1);
  }, []);

  const decrease = useCallback(() => {
    setCounter(prev => prev - 1);
  }, []);

  const contextValue = {
    counter,
    increase,
    decrease,
  };

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
};

export default CounterProvider;
