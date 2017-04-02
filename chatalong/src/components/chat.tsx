import * as React from 'react';
import { IChatState, IChatProps, IConversation } from '../interfaces/ChatInterfaces';
import Config from '../config';
import { ConnectDB } from '../interfaces/dbClient';

class Chat extends React.Component<IChatProps, IChatState> {
    constructor(props: IChatProps) {
        super(props);
        this.state = {
            conversations: []
        };
    }

    async componentWillMount() {
        try {
            await ConnectDB();
            if (!Config.dbInstance) throw new ReferenceError("DB Connection not initiated");
            Config.dbInstance.collection('chat').find({}).toArray((err, data: IConversation[]) => {
                this.setState(Object.assign({}, this.state, { conversations: data }));
            });
        }
        catch (error) {
            console.warn("Error connecting DB.", error);
        }
    }

    onChange = (conversations: IConversation[]) => {
        this.setState(Object.assign({}, this.state, { conversations }));
    }

    render() {
        const content = this.state.conversations.map(function (element: IConversation, idx: number) {
            return <div key={element._id}>{element.text}</div>;
        });
        return (
            <div>
                {content} || {`Why wait? Start Chating like there is no tomorrow...!`}
            </div>
        );
    }
}

export default Chat;
