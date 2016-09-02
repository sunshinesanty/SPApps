import * as React from 'react';
import {Entity, EditorState, ContentBlock } from 'draft-js';

interface IEntityType {

}


interface IEntityCallBackFunction {
 (start: number, end: number): void
}

interface IEntityData {
    editorState: EditorState;
    enityType: IEntityType;
}

export class EditorEnity {
    public EditorState: EditorState;
    constructor(props: any) {
    }

    getEntityStrategy = (mutability: string) => {
        return (contentBlock: ContentBlock, callback: IEntityCallBackFunction) => {
            contentBlock.findEntityRanges(
                (character) => {
                    const entityKey = character.getEntity();
                    if (entityKey === null) {
                        return false;
                    }
                    return Entity.get(entityKey).getMutability() === mutability;
                },
                callback
            );
        };
    }
}