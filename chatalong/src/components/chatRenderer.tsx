import * as React from 'react';
import { observer } from 'mobx-react';
import { IConversation } from '../interfaces/ChatInterfaces';
import chatStore from '../Store/chatStore';
import LikeRenderer from './like';

@observer
export class ChatRenderer extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.loadData();
    }

    loadData = async () => {
        await chatStore.chat.getAllConversations();
    }

    render() {
        const content = chatStore.chat.conversations.map(function (element: IConversation, idx: number) {
            return (
                <li key={element.id} className="list-group-item">
                    <div className="row chatRow">
                        <div className="col-md-1 col-sm-2 col-xs-2 uname">{element.username} : </div>
                        <div className="col-md-10 col-sm-8 col-xs-8">{element.text}</div>
                        <div className="col-md-1 col-sm-2 col-xs-2 delContainer" >
                            <div>
                                <LikeRenderer
                                    postID={element.id}
                                    likes={element.likes}
                                    username={chatStore.activeUserName}
                                />
                            </div>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </li>
            );
        });
        return (
            <div className="container Chat" >
                <ul className="list-group">
                    {content}
                </ul>
            </div>
        );
    }
}
