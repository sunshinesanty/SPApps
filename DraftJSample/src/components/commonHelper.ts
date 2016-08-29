import { EditorStyles } from './editorStyles';

export class CommonHelperFunction {
    static getDecoratedStyle(mutability: string) {
        switch (mutability) {
            case 'IMMUTABLE': return EditorStyles.EntityStyle.immutable;
            case 'MUTABLE': return EditorStyles.EntityStyle.mutable;
            case 'SEGMENTED': return EditorStyles.EntityStyle.segmented;
            default: return null;
        }
    }
    static entityMap: {
        Immutable: {
            type: 'TOKEN',
            mutability: 'IMMUTABLE',
        },
        Mutable: {
            type: 'TOKEN',
            mutability: 'MUTABLE',
        },
        Segmented: {
            type: 'TOKEN',
            mutability: 'SEGMENTED',
        }
    }
}