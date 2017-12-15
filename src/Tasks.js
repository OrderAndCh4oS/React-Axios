import RequestJson from './RequestJson';
import React, { Component } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import { sortByCompletedAndDate } from './helpers';

export default class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            member: [],
            pagination: {},
        };
        this.requestJson = new RequestJson();
        this.prependTask = this.prependTask.bind(this);
        this.markTask = this.markTask.bind(this);
    }

    componentDidMount() {
        this.requestTasks('todos?page=2');
    }

    requestTasks(page) {
        this.requestJson.get(page)
            .then(response => {
                console.log(response.data);
                const data = response.data;
                this.setState({
                    pagination: {
                        total: data['hydra:totalItems'],
                        current: data['hydra:view']['@id'],
                        first: data['hydra:view']['hydra:first'],
                        last: data['hydra:view']['hydra:last'],
                        next: data['hydra:view']['hydra:next'],
                        prev: data['hydra:view']['hydra:previous'],
                    },
                    member: data['hydra:member'],
                });
            });
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
                .map(
                    task =>
                        <div key={task.id}>
                            <Task task={task} markTask={this.markTask}/>
                        </div>,
                );
        }
        return task;
    }

    markTask(id) {
        let task = this.state.member.filter(x => x.id === id).pop();
        this.requestJson.put('todos/' + id + '.json', {
            isCompleted: !task.isCompleted,
        }).then(response => {
            let tasks = [...this.state.member];
            tasks = tasks.filter(x => (x.id !== id));
            tasks.push(response.data);
            tasks.sort(task => task.isCompleted);
            this.setState(prevState => ({
                member: tasks,
                pagination: prevState.pagination,
            }));
        });
    }

    render() {
        return (
            <div>
                <TaskForm prependTask={this.prependTask}/>
                {this.renderTasks()}
            </div>
        );
    }
}