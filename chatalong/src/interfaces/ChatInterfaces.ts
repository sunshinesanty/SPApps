// tslint:disable:interface-name

export interface IChatFormState {
    username: string;
    content: string;
}

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
    created: string;
    modifed: string;
}

class ChatChaceKeys {
    get convs() { return 'convs'; }
}
export const ChaceKeys = new ChatChaceKeys();