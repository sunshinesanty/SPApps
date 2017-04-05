import { MongoClient } from 'mongodb';
import * as React from 'react';
import * as ReactDom from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        MongoClient.connect('mongo://localhost:27017', function(error, db){
            console.log(db);
            console.log(error);
        });
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
var staticData = [{ text: 'Hello world' }];
ReactDom.render(<App data={staticData} />, document.getElementById('app'));
