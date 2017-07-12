export interface Payload {
    SourceString: string;
    SubString: string;
}

export interface AppState {
    isLoading: boolean;
    ResutIdx: number[];
    data: Payload;
}

export interface CompareRendererProps {
    startIndices: number[];
    dataCompared: Payload;
}