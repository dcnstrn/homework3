import React, { useCallback } from 'react';
import FlatListEventEmitter from '../../services/flatListEventEmitter';
import Button from '../button';

const ControlButtons = () => {
  const showList = useCallback(() => {
    FlatListEventEmitter.emit('show-flat-list', true);
  }, []);

  const hideList = useCallback(() => {
    FlatListEventEmitter.emit('show-flat-list', false);
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <Button title={'show list'} onClick={showList} />
      <Button title={'hide list'} onClick={hideList} />
    </div>
  );
};

export default ControlButtons;
