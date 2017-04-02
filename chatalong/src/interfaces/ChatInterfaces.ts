export interface IChatProps {
    chatsperpage: number;
    lastmodifieddate: string;
}
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
    created: string;
    modified: string;
}
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


