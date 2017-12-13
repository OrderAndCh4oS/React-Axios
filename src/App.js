import React, { Component } from 'react';
import RequestJson from './RequestJson';
import Tasks from './Tasks';

class App extends Component {
    constructor() {
        super();
        this.requestJson = new RequestJson();
    }

    render() {
        return (
            <div className="App">
                <h1 className="f1 pb3 bb bw1">ToDo</h1>
                <Tasks/>
            </div>
        );
    }
}

export default App;
