import RequestJson from './RequestJson';
import React, { Component } from 'react';

export default class Task extends Component {
    constructor (props) {
        super(props);
        this.state = {
                "title": "Loading...",
                "description": "Loading...",
                "isComplete": "Loading..."
        }
    }

    componentDidMount() {
        new RequestJson().get('todos/1.json')
            .then(response => {
                this.setState(
                    response.data
                );
        })
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <p>{this.state.description}</p>
                <p>{this.state.isComplete ? 'Done' : '...'}</p>
            </div>
        )
    }
}