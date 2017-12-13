import RequestJson from './RequestJson';
import React, { Component } from 'react';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.requestJson = new RequestJson();
        this.performMarkTask = this.performMarkTask.bind(this);
    }

    performMarkTask() {
        this.props.markTask(this.props.task.id);
    }

    render() {
        return (
            <div className="bb bw1 pb3">
                <h2>{this.props.task.title}</h2>
                <p className="f4">{this.props.task.description}</p>
                <p className="f4">Status: <span
                    className="b">{this.props.task.isCompleted
                    ? 'Complete'
                    : 'Todo'}</span></p>
                <button
                    className="bg-black white b--black pointer hover-bg-blue bn pa2 f4"
                    onClick={this.performMarkTask}>
                    {this.props.task.isCompleted ? 'Undo' : 'Done'}
                </button>
            </div>
        );
    }
}