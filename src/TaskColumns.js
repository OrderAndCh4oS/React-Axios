import React, { Component } from 'react';
import Request from './Request';
import Tasks from './Tasks';
import TaskForm from './TaskForm';
import { paginatedHydraData } from './Hydra';

export default class TaskColumns extends Component {

    constructor() {
        super();
        this.state = {
            todo: {
                member: [],
                pagination: {},
            },
            complete: {
                member: [],
                pagination: {},
            },
        };
        this.todoResponseHandler = this.todoResponseHandler.bind(this);
        this.completeResponseHandler = this.completeResponseHandler.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.getData(
            'api/todos?page=1&isCompleted=0',
            this.todoResponseHandler,
        );
        this.getData(
            'api/todos?page=1&isCompleted=1',
            this.completeResponseHandler,
        );
    }

    getData(endPoint, handler) {
        const request = new Request();
        request.getData(endPoint, handler);
    }

    todoResponseHandler(response) {
        const data = response.data;
        const todo = paginatedHydraData(data);
        this.setState(prevState => ({
            todo: todo,
            complete: prevState.complete,
        }));
    }

    completeResponseHandler(response) {
        const data = response.data;
        const complete = paginatedHydraData(data);
        this.setState(prevState => ({
            todo: prevState.todo,
            complete: complete,
        }));
    }

    updateState(type, page) {
        if(type === 'todo') {
            this.getData(page, this.todoResponseHandler);
        }
        if(type === 'complete') {
            this.getData(page, this.completeResponseHandler);
        }
    }

    render() {
        return (
            <div>
                <TaskForm updateState={this.updateState}/>
                <div className="flex">
                    <div className="w-50 pr3 br b--black-20">
                        <h2>Todo</h2>
                        <Tasks type={'todo'} tasks={this.state.todo}
                               updateState={this.updateState}/>
                    </div>
                    <div className="w-50 pl3">
                        <h2>Complete</h2>
                        <Tasks type={'complete'} tasks={this.state.complete}
                               updateState={this.updateState}/>
                    </div>
                </div>
            </div>
        );
    }
}