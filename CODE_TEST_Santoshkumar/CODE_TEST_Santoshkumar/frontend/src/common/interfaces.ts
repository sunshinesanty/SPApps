export interface Payload {
    SourceString: string;
    SubString: string;
}

export interface AppState {
    isLoading: boolean;
    ResutType: number[];
}

export interface CompareRendererProps {
    startIndices: number[];
    dataCompared: Payload;
}