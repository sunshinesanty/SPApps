import * as React from 'react';
import './App.css';
import { ChatRenderer } from './components/chatRenderer';
import { ChatForm } from './components/chatForm';
import ChatStore from './Store/chatStore';
import { IChatFormState, IConversation } from './interfaces/ChatInterfaces';

const logo = require('./logo.svg');

class App extends React.Component<null, {}> {
  onSave = ({ username, content }: IChatFormState): void => {
    const conv: IConversation = {
      username,
      text: content,
      id: 0,
      likes: [],
      created: new Date().toISOString(),
      modifed: new Date().toISOString()
    };
    ChatStore.chat.saveConversation(conv);
  }
  render() {
    return (
      <div className="App container-fluid">
        <div className="App-header jumbotron">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="page-header">
            <h2 className="">Welcome to React- Sample chat</h2>
          </div>
        </div>
        <ChatForm username="" content="" onSave={this.onSave} isDisabled={false} />
        <ChatRenderer />
      </div>
    );
  }
}

export default App;
