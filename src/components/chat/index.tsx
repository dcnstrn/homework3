import React, { useCallback, useMemo, useState } from 'react';
import ChatEmitter from '../../services/chatEmitter';
import {useDebouncedCallback} from 'use-debounce';
import { countScore } from './countScore';

const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const [score, setScore] = useState<Record<string, number>>({});

  const sendMessageDebounce = useDebouncedCallback((text: string) => {

    setScore(prevValue => {
      return {
        ...prevValue,
        ...countScore(text),
      }
    });

    ChatEmitter.emit('newMessage', text.trim());
  }, 100);

  const onChangeText = useCallback((event: any) => {
    setMessage(event.target.value);
  }, []);

  const onEnter = useCallback((event: any) => {
    const isEnter = event.key === 'Enter';
    if (isEnter) {
      setMessage(prevMessage => {
        sendMessageDebounce(prevMessage);
        return '';
      });
    }
  }, []);

  const usersScrore = useMemo(() => {
    return Object.keys(score).map(key => {
      return (
        <div key={key} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <div>{key}</div>
          <div style={{fontWeight: 'bold', marginLeft: 10 }}>{score[key]}</div>
        </div>
      )
    });
  }, [score]);

  return (
    <div className={'chat'}>
      <div className={'score'} style={{marginTop: 50, marginBottom: 50}}>
        {usersScrore}
      </div>
      <input type={'text'} value={message} onChange={onChangeText} style={{width: 300, height: 50}} onKeyDown={onEnter} />
    </div>
  );
};

export default Chat;
