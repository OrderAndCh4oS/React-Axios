import RequestJson from './RequestJson';
import React, { Component } from 'react';

export default class Task extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: 0,
            title: "Loading...",
            description: "Loading...",
            isComplete: "Loading..."
        };
        this.mark = this.mark.bind(this);
        this.requestJson = new RequestJson();
    }


    componentDidMount() {
        this.requestJson.get('todos/1.json')
            .then(response => {
                this.setState(
                    response.data
                );
        })
    }

    mark() {
        console.log(!this.state.isComplete)
        this.requestJson.put('todos/1.json', {
            id: this.state.id,
            isComplete: !this.state.isComplete
        }).then(response => {
            this.setState(
                response.data
            );
        });
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <p>{this.state.description}</p>
                <p>Status: {this.state.isComplete ? 'Complete' : 'Todo'}</p>
                <button onClick={this.mark}>{this.state.isComplete ? 'Mark as complete' : 'Mark as todo'}</button>
            </div>
        )
    }
}