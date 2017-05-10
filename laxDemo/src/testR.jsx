import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react'

@observer
class MyTestR extends React.Component {
    @observable user;
    @observable favGame;
    self;
    constructor(props) {
        super(props);
        self = this;
        this.user = 'lax';
        this.favGame = 'cricket';
    }

    @action
    updatedetails() {
        self.user = 'laxmi';
        self.favGame = 'T20 cricket';
        console.log(self);
    }

    render() {
        return (
            <div>
                <span>My name ls {this.user} and my fav game is {this.favGame}</span>;
                <button onClick={this.updatedetails}>Update Me</button>
            </div>
        );
    }
}

ReactDOM.render(<MyTestR />, document.getElementById('app'));
