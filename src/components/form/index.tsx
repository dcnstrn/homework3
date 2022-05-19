import React, { useContext, useEffect, useRef } from 'react';
import { CounterContext } from '../../providers/counterProvider/context';
import Button from '../button';
import Counter from '../counter';

const Form = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {increase, decrease} = useContext<any>(CounterContext);

  useEffect(() => {
    console.log('component did mount');

    inputRef.current?.focus?.();

    return () => {
      console.log('component unmount');
    }
  }, [inputRef])

  return (
    <div>
      <Counter />
      <Button title={'increase value'} onClick={increase} />
      <Button title={'decrease value'} onClick={decrease} />
      <input ref={inputRef} />
    </div>
  );
};

export default Form;
