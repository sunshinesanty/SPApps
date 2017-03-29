export interface IChatProps {
    chatsperpage: number;
    lastmodifieddate: string;
}
export interface IUser{
    id: number;
    name: string;
}
export interface ILikesCollection {
    likes: ILike[];
    likecount: number;
}
export interface ICommentsCollection {
    comments: IComment[];
    commentcount: number;
}
export interface ILike {
    id: number;
    conversationID: number,
    userid: number;
    created: string;
    modifed: string;
}
export interface IComment {
    commentText: string;
    id: number;
    conversationID: number,
    userid: number;
    created: string;
    modifed: string;
}
export interface IConversation{
    id: number;
    text: string;
    comments?: ICommentsCollection;
    likes?: ILikesCollection;
    userid: number;
    created: string;
    modifed: string;
}
export interface IChatState {
    conversations: IConversation[];
}