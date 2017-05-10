import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { IConversation, IStoreProp } from '../interfaces/ChatInterfaces';
import PerChat from './perChat';

@inject('chatStore')
@observer
export class ChatRenderer extends React.Component<IStoreProp, {}> {
    constructor(props: IStoreProp) {
        super(props);
        this.loadData();
    }

    loadData = async () => {
        if (this.props.chatStore) {
            await this.props.chatStore.chat.getAllConversations();
        } else {
            throw new ReferenceError('Chat Store not being passed as Property');
        }
    }

    render() {
        const { chatStore } = this.props;
        const content = chatStore ?
            chatStore.chat.conversations.map(function (element: IConversation, idx: number) {
                return (
                    <PerChat key={element.id} chatElement={element} />
                );
            }) : null;
        return (
            <div className="container Chat" >
                <ul className="list-group">
                    {content}
                </ul>
            </div>
        );
    }
}
