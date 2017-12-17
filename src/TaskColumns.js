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

    static taskRequest(endPoint, handler) {
        const request = new Request();
        request.getData(endPoint, handler);
    }

    componentDidMount() {
        const endPoint = 'api/todos?page=1';
        TaskColumns.taskRequest(
            endPoint + '&isCompleted=0&order[createdAt]=desc',
            this.todoResponseHandler,
        );
        TaskColumns.taskRequest(
            endPoint + '&isCompleted=1&order[completedAt]=desc',
            this.completeResponseHandler,
        );
    }

    requestTaskData() {
        TaskColumns.taskRequest(
            this.state.todo.pagination.current,
            this.todoResponseHandler,
        );
        TaskColumns.taskRequest(
            this.state.complete.pagination.current,
            this.completeResponseHandler,
        );
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
            TaskColumns.taskRequest(
                page,
                this.todoResponseHandler,
            );
        }
        if(type === 'complete') {
            TaskColumns.taskRequest(
                page,
                this.completeResponseHandler,
            );
        }
        if(type === 'both') {
            this.requestTaskData();
        }
    }

    render() {
        return (
            <div>
                <TaskForm updateState={this.updateState}/>
                <div className="flex">
                    <div className="w-50 pr3 br b--black-20">
                        <h2 className="pb3 bb b--black-20">Todo</h2>
                        <Tasks type={'todo'} tasks={this.state.todo}
                               updateState={this.updateState}/>
                    </div>
                    <div className="w-50 pl3">
                        <h2 className="pb3 bb b--black-20">Done</h2>
                        <Tasks type={'complete'} tasks={this.state.complete}
                               updateState={this.updateState}/>
                    </div>
                </div>
            </div>
        );
    }
}