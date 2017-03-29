import * as React from 'react';
import {IChatState, IChatProps, IConversation} from '../interfaces/ChatInterfaces';

class Chat extends React.Component<IChatProps, IChatState> {
constructor(props: IChatProps) {
    super(props);
    this.state = { conversations: [{
                    id: 1, 
                    text: 'hello world',
                    userid: 1, 
                    created: (new Date()).toString(), 
                    modifed: (new Date()).toString()
                }] 
            };
    }

    onChange = (conversations: IConversation[]) => {
        this.setState(Object.assign({}, this.state, {conversations}));
    }

    render() {
        const content = this.state.conversations.map(function (element: IConversation, idx: number) {
            return <div key={element.id}>{element.text}</div>;
        });
        return (
            <div>
                {content}
            </div>
        );
    }
}

export default Chat;
