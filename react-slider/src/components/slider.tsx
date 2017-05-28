import * as React from 'react';
import { SliderProps, SliderState } from '../interfaces/sliderInterfaces';

class Slider extends React.Component<SliderProps, SliderState> {
    constructor(props: SliderProps) {
        super(props);
        this.state = { currentSlider: -1 };
    }
    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div id="Carousel" className="carousel slide">
                            <div className="carousel-inner">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slider;
