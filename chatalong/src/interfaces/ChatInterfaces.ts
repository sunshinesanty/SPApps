// tslint:disable:interface-name

export interface IChatFormState {
    username: string;
    content: string;
}
<<<<<<< HEAD

export interface IChatFormProps {
    username: string;
    content: string;
    isDisabled: boolean;
    onSave: (ChatData: IChatFormState) => void;
}

export interface ILikeRendererProps {
    postID: number;
    username: string;
    likes: ILike[];
}
export interface ILikeRendererState {
    isLiked: boolean;
    likeCount: number;
}

export interface IConversation {
    id: number;
    text: string;
    username: string;
    created: string;
    modifed: string;
    likes: ILike[];
}
export interface ILike {
    id: number;
    concersationID: number;
    username: string;
=======
export interface ILike {
    _id: string;
    conversationID: string,
    created: string;
    modified: string;
}
export interface IComment {
    _id: string;
    commentText: string;
    conversationID: string,
>>>>>>> 845ae6d692a6b55df21c45d7a1c08e4ed0a73ce3
    created: string;
    modified: string;
}
<<<<<<< HEAD

class ChatChaceKeys {
    get convs() { return 'convs'; }
}
export const ChaceKeys = new ChatChaceKeys();
=======
export interface IConversation{
    _id: string;
    comments?: IComment[];
    likes?: ILike[];    
    text: string;
    created: string;
    modified: string;
}
export interface IChatState {
    conversations: IConversation[];
}


>>>>>>> 845ae6d692a6b55df21c45d7a1c08e4ed0a73ce3
