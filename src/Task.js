import React, { Component } from 'react';
import { metaDate } from './helpers';

export default class Task extends Component {

    performMarkTask = () => {
        this.props.markTask(this.props.task.id);
    };

    showDate() {
        if(this.props.task.completedAt !== null) {
            return metaDate('Done', this.props.task.completedAt);
        } else {
            return metaDate('Added', this.props.task.createdAt);
        }
    }

    render() {
        return (
            <div className="bb bw1 pb3">
                <h3 className="mb2">{this.props.task.title}</h3>
                <p className="f4 mt0">Status: <span className={'b ' +
                (this.props.task.isCompleted ? '' : 'blue')}>
                        {this.props.task.isCompleted ? 'Done' : 'Todo'}
                    </span>
                </p>
                <p className="f4">{this.props.task.description}</p>
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
