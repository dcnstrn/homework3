import React, { FC, memo } from 'react';
import {IButtonProps} from './interface';

const Button: FC<IButtonProps> = ({title, onClick}) => {
  return (
    <button type={'button'} onClick={onClick}>
      {title}
    </button>
  );
};

export default memo(Button);
