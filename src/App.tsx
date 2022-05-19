import React from 'react';
import './App.css';
import Chat from './components/chat';
import Messages from './components/chat/messages';

function App() {
  return (
    <div className="App">
      <Chat />
      <Messages />
    </div>
  );
}

export default App;
