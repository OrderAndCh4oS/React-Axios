import React, { Component } from 'react';
import './App.css';
import RequestJson from './RequestJson';
import Tasks from './Tasks';
import TaskForm from './TaskForm';

class App extends Component {
    constructor() {
        super();
        this.requestJson = new RequestJson();
    }

    render() {
        return (
            <div className="App">
                <TaskForm/>
                <Tasks/>
            </div>
        );
    }
}

export default App;
