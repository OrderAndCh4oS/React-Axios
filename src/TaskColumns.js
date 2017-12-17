import React, { Component } from 'react';
import Tasks from './Tasks';
import Request from './Request';

export default class TaskColumns extends Component {

    updateState() {
        this.getData(this.state.pagination.current);
    }

    getData(endPoint) {
        const request = new Request();
        request.getData(endPoint, this.getResponseHandler);
    }

    render() {
        return (
            <div>
                <Tasks isCompleted={'false'} getData={this.getData}/>
            </div>
        );
    }
}