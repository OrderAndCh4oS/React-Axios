import Request from './Request';
import React, { Component } from 'react';
import Task from './Task';
import Pagination from './Pagination';
import { sortByCompletedAndDate } from './helpers';

export default class Tasks extends Component {
    constructor(props) {
        super(props);
        this.prependTask = this.prependTask.bind(this);
        this.markTask = this.markTask.bind(this);
        this.paginationResponseHandler = this.paginationResponseHandler.bind(
            this);
    }

    prependTask(task) {
        this.setState(prevState => ({
            member: [
                task,
                ...prevState.member,
            ],
            pagination: prevState.pagination,
        }));
    }

    markTask(id) {
        let task = this.props.tasks.member.filter(x => x.id === id).pop();
        const request = new Request();
        request.put('api/todos/' + id, {
            isCompleted: !task.isCompleted,
        }).then(() => {
            this.props.updateState(
                this.props.type,
                this.props.tasks.pagination.current,
            );
        });
    }

    paginationResponseHandler(response) {
        this.props.updateState(
            this.props.type,
            response.data['hydra:view']['@id'],
        );
    }

    renderTasks() {
        let task = null;
        if(typeof this.props.tasks.member === 'undefined') {
            task = <div>Loading...</div>;
        } else {
            task = this.props.tasks.member
                .sort((a, b) => sortByCompletedAndDate(a, b))
                .map(this.setTask());
        }
        return task;
    }

    setTask() {
        return task =>
            <div key={task.id}>
                <Task task={task} markTask={this.markTask}/>
            </div>;
    }

    render() {
        return (
            <div>
                {this.renderTasks()}
                <Pagination pagination={this.props.tasks.pagination}
                            getResponseHandler={this.paginationResponseHandler}/>
            </div>
        );
    }
}