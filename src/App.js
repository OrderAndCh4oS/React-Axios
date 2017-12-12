import React, { Component } from 'react';
import './App.css';
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
                <Tasks/>
            </div>
        );
    }
}

export default App;
