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
        this.appendTask = this.appendTask.bind(this);
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

    appendTask(task) {
        this.setState(prevState => ({
            tasks: [
                ...prevState.tasks,
                task,
            ],
        }));
    }

    renderTasks() {
        let task = null;
        if(!this.state.tasks.length) {
            task = <div>Loading...</div>;
        } else {
            task = this.state.tasks.map(task =>
                <div key={task.id}>
                    <Task task={task}/>
                </div>,
            );
        }
        return task;
    }

    render() {
        return (
            <div>
                <TaskForm appendTask={this.appendTask}/>
                {this.renderTasks()}
            </div>
        );
    }
}