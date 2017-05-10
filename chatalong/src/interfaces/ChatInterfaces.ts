// tslint:disable:interface-name

import {ChatStoreObject} from '../Store/chatStore';
 
export interface IChatFormState {
    username: string;
    content: string;
}
export interface IStoreProp {
    chatStore?: ChatStoreObject;
}
export interface IPerChatProps extends IStoreProp {
    chatElement: IConversation;
}

export interface IChatFormProps extends IStoreProp {
    username: string;
    content: string;
    isDisabled: boolean;
    onSave: (ChatData: IChatFormState) => void;
}

export interface ILikeRendererProps extends IStoreProp {
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
    modified: string;
}

class ChatChaceKeys {
    get convs() { return 'convs'; }
}
export const ChaceKeys = new ChatChaceKeys();