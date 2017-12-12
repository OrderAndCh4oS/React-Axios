import RequestJson from './RequestJson';
import React, { Component } from 'react';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.task;
        this.markTask = this.markTask.bind(this);
        this.requestJson = new RequestJson();
    }

    markTask() {
        this.requestJson.put('todos/' + this.state.id + '.json', {
            isCompleted: !this.state.isCompleted,
        }).then(response => {
            this.setState(
                response.data,
            );
        });
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <p>{this.state.description}</p>
                <p>Status: {this.state.isCompleted ? 'Complete' : 'Todo'}</p>
                <button onClick={this.markTask}>{this.state.isCompleted
                    ? 'Undo'
                    : 'Done'}</button>
            </div>
        );
    }
}