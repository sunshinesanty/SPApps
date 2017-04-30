import * as React from 'react';
import * as ReactDom from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var data = this.props.data.map(function (value, index) {
            return <li>{value.text}</li>;
        });
        return (
            <div>
                <ul>
                    {data}
                </ul>
            </div>
        );
    }
}
var staticData = [{ text: 'Hello world' }, { text: 'How are you' }, { text: 'I work with webpack for web components' }, { text: 'I work with ts for server compents' }];
ReactDom.render(<App data={staticData} />, document.getElementById('app'));
