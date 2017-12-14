import RequestJson from './RequestJson';
import React, { Component } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';

export default class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
        this.requestJson = new RequestJson();
        this.prependTask = this.prependTask.bind(this);
        this.markTask = this.markTask.bind(this);
    }

    componentDidMount() {
        this.requestTasks();
    }

    requestTasks() {
        this.requestJson.get('todos.json')
            .then(response => {
                this.setState({
                    tasks: response.data,
                });
            });
    }

    prependTask(task) {
        this.setState(prevState => ({
            tasks: [
                task,
                ...prevState.tasks,
            ],
        }));
    }

    renderTasks() {
        let task = null;
        if(!this.state.tasks.length) {
            task = <div>Loading...</div>;
        } else {
            task = this.state.tasks.sort((a, b) => {
                if(a.isCompleted === b.isCompleted) {
                    return a.createdAt > b.createdAt;
                } else {
                    return a.isCompleted - b.isCompleted;
                }
            }).map(task =>
                <div key={task.id}>
                    <Task task={task} markTask={this.markTask}/>
                </div>,
            );
        }
        return task;
    }

    markTask(id) {
        let task = this.state.tasks.filter(x => x.id === id).pop();
        this.requestJson.put('todos/' + id + '.json', {
            isCompleted: !task.isCompleted,
        }).then(response => {
            let tasks = [...this.state.tasks];
            tasks = tasks.filter(x => (x.id !== id));
            tasks.push(response.data);
            tasks.sort(task => task.isCompleted);
            this.setState({tasks: tasks});
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