import React, { useState, useEffect, useMemo } from 'react';
import chatEmitter from '../../services/chatEmitter';

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const onEvent = (message: string) => {
      setMessages(prevMessages => [...prevMessages, message]);
    };

    chatEmitter.on('newMessage', onEvent);

    return () => {
      chatEmitter.off('newMessage', onEvent);
    };
  }, []);

  const listOfMessages = useMemo(() => {
    return messages.map((text, index) => {
      return (
        <div key={text + index}>
          {text}
        </div>
      );
    });
  }, [messages]);

  return (
    <div className={'chat'} style={{marginTop: 50}}>
      {listOfMessages}
    </div>
  );
};

export default Chat;
