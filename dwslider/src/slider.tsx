import * as React from 'react';
import { SliderProps } from './interfaces';
import { Motion, presets } from 'react-motion';

class Slider extends React.Component<SliderProps, {}> {
    getDefaults = () => {
        let styleObjects = {};
        this.props.data.forEach(dt => { styleObjects[dt.id] = { val: { x: -360, scale: 0 } }; });
        return styleObjects;
    }
    getEnds = () => {
        let styleObjects = {};
        this.props.data.forEach(dt => { styleObjects[dt.id] = { val: { x: 0, scale: 1 } }; });
        return styleObjects;
    }
    render() {
        return (
            <div>
                <Motion defaultStyle={} endValeu={this.getEnds()} >
                    {value => {
                        const style = { transform: `rotate(${value})` };
                        return (
                            <div
                                className="block"
                                style={style}
                            >
                                {value.x}
                            </div>
                        );
                    }}
                </Motion>
            </div>
        );
    }
}

export default Slider;
