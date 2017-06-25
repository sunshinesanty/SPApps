import * as React from 'react';

import { observer, inject } from 'mobx-react';

import { IConversation, IChatProps } from '../interfaces/ChatInterfaces';
import LikeRenderer from './like';

@inject('chatStore')
@observer
export class ChatRenderer extends React.Component<IChatProps, {}> {
    constructor(props: IChatProps) {
        super(props);
    }

    onDelete = (e: React.FormEvent<HTMLButtonElement>, postId: number) => {
        if (this.props.chatStore) {
            this.props.chatStore.chat.removeConversation(postId);
        }
    }

    render() {
        const { chats, activeUserName } = this.props;
        let content;
        if (chats) {
            content = chats.map(function (element: IConversation, idx: number) {
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
                                        username={activeUserName}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.onDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                );
            });
        };
        return (
            <div className="container Chat" >
                <ul className="list-group">
                    {content}
                </ul>
            </div>
        );
    }
}
