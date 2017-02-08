import * as React from 'react';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {AppState} from '../store/ScoreState'

@observer
export class TimerView extends React.Component<{appState: AppState}, {}> {
    render() {
        return (
            <div>
                <button onClick={this.onReset}>
                    Seconds passed: {this.props.appState.timer}
                </button>
                <DevTools />
            </div>
        );
     }

     onReset = () => {
         this.props.appState.resetTimer();
     }
};