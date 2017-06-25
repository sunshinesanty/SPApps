import * as React from 'react';
import { SlideProps, SlideState } from '../interfaces/sliderInterfaces';

class Slide extends React.Component<SlideProps, SlideState> {
    constructor(props: SlideProps) {
        super(props);
        this.state = { isActive: true, isError: false };
    }
    render() {
        if (this.state.isError) {
            return (
                <div>Error rendering data.</div>
            );
        }
        else {
            return (
                <div>{this.props.content}</div>
            );
        }
    }
}

export default Slide;
