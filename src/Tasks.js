import Request from './Request';
import React, { Component } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import Pagination from './Pagination';
import { sortByCompletedAndDate } from './helpers';
import { paginatedHydraData } from './Hydra';

export default class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            member: [],
            pagination: {},
        };
        this.prependTask = this.prependTask.bind(this);
        this.markTask = this.markTask.bind(this);
        this.getResponseHandler = this.getResponseHandler.bind(this);
    }

    componentDidMount() {
        const request = new Request();
        request.getData('/api/todos?page=1', this.getResponseHandler);
    }

    getResponseHandler(response) {
        const data = response.data;
        const state = paginatedHydraData(data);
        this.setState(state);
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

    renderTasks() {
        let task = null;
        if(!this.state.member.length) {
            task = <div>Loading...</div>;
        } else {
            task = this.state.member
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

    markTask(id) {
        let task = this.state.member.filter(x => x.id === id).pop();
        const request = new Request();
        request.put('api/todos/' + id, {
            isCompleted: !task.isCompleted,
        }).then(response => {
            this.markTaskResponseHandler(id, response);
        });
    }

    markTaskResponseHandler(id, response) {
        let tasks = [...this.state.member];
        tasks = tasks.filter(x => (x.id !== id));
        tasks.push(response.data);
        tasks.sort(task => task.isCompleted);
        this.setState(prevState => ({
            member: tasks,
            pagination: prevState.pagination,
        }));
    }

    render() {
        return (
            <div>
                <TaskForm prependTask={this.prependTask}/>
                {this.renderTasks()}
                <Pagination pagination={this.state.pagination}
                            getResponseHandler={this.getResponseHandler}/>
            </div>
        );
    }
}