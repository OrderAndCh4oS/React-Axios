import React, { Component } from 'react';
import Moment from 'react-moment';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.performMarkTask = this.performMarkTask.bind(this);
    }

    performMarkTask() {
        this.props.markTask(this.props.task.id);
    }

    showDate() {
        if(this.props.task.completedAt !== null) {
            return this.metaDate('Done', this.props.task.completedAt);
        } else {
            return this.metaDate('Added', this.props.task.createdAt);
        }
    }

    metaDate(label, date) {
        return <p className="f5 i mt0 pt2 fr w-80 tr">
            {label}: <Moment format="MMM Do YYYY, h:mm:ss a">{date}</Moment>
        </p>;
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
                {this.showDate()}
                <button
                    className="bg-black white b--black pointer hover-bg-blue bn pa2 f4 db"
                    onClick={this.performMarkTask}>
                    {this.props.task.isCompleted ? 'Undo' : 'Done'}
                </button>
            </div>
        );
    }
}
