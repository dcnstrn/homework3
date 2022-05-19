import React, {useContext} from 'react';
import { CounterContext } from '../../providers/counterProvider/context';

const Counter = () => {
  const {counter} = useContext<any>(CounterContext);

  return (
    <div>{counter}</div>
  )
};

export default Counter;
