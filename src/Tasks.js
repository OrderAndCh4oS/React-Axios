import RequestJson from './RequestJson';
import React, { Component } from 'react';
import Task from './Task';

export default class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
        this.requestJson = new RequestJson();
    }

    componentDidMount() {
        this.requestJson.get('todos.json')
            .then(response => {
                this.setState({
                    tasks: response.data,
                });
            });
    }

    render() {
        return (this.state.tasks.map(task =>
            <div key={task.id}>
                <Task task={task}/>
            </div>,
        ));
    }
}