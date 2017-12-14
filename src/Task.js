import RequestJson from './RequestJson';
import React, { Component } from 'react';
import Moment from 'react-moment';

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
                <h2 className="mb2">{this.props.task.title}</h2>
                <p className="f3 mt0">Status: <span className={'b ' +
                (this.props.task.isCompleted ? '' : 'blue')}>
                        {this.props.task.isCompleted ? 'Complete' : 'Todo'}
                    </span>
                </p>
                <p className="f3">{this.props.task.description}</p>
                <p className="f5 i mt0 pt2 fr w-80 tr">
                    Added: <Moment format="MMMM Do YYYY, h:mm:ss a">
                    {this.props.task.createdAt}
                </Moment>
                </p>
                <button
                    className="bg-black white b--black pointer hover-bg-blue bn pa2 f4 db"
                    onClick={this.performMarkTask}>
                    {this.props.task.isCompleted ? 'Undo' : 'Done'}
                </button>
            </div>
        );
    }
}
