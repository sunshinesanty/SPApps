/*// tslint:disable:interface-name
import * as React from 'react';
import DWSlide from './slider';

export interface IDWSliderState {
    content?: string[];
    slideCount: number;
    currentSlider: number;
    data: any;
}
export interface IDWSliderProps {
    Data: any;
}

export default class DWSlider extends React.Component<IDWSliderProps, IDWSliderState> {
    constructor(props: any) {
        super(props);
        this.state = { slideCount: 5, currentSlider: 0, data: this.props.Data };
    }

    render() {

        let count = this.state.slideCount;
        let childElements = [];
        while (count > 0) {
            childElements.push(<DWSlide key={Math.random()} />);
            count--;
        }
        return (
            <div className="slider">
                {childElements}
            </div>
        );
    }
}*/