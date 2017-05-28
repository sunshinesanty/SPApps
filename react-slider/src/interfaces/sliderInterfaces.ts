export interface SliderProps {
    sliderCount: number;
    data: dataProps[];
}

export interface SliderState {
    currentSlider: number;
}

export interface SlideProps {
    content?: string;
    postID?: number;
}

export interface SlideState {
    isActive: boolean;
    isError: boolean;
}
export enum FileType {
    document = 1,
    image = 2,
    video = 3
}
export interface dataProps {
    id: number;
    filetype: FileType;
    Url: string;
    Thumbnail: string;
}
