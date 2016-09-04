import { EditorState } from 'draft-js';

export interface IEditorState {
    editorState: EditorState;
}

//Controlled input sample
export interface ICtrlInpState {
    value:string;
}

export interface ILinkProps {
    SetEditorState: (editorState: EditorState) => void; 
    IsSelectionActive: () => boolean;
    SetLink: (urlValue:string, showUrlInput:boolean) => void; 
    RemoveLink: () => void;
    urlValue: string;
    showURLInput: boolean;
} 

export interface ILinkState {
    urlValue: string;    
    showURLInput: boolean;
} 