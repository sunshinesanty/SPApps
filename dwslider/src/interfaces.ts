
export interface SlideProps {
    data: SliderData;
}

export interface SliderData {
    id: number;
    url?: string;
    content?: string;
}

export interface SliderProps {
    data: SliderData[];
}