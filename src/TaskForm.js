import RequestJson from './RequestJson';
import React, { Component } from 'react';
import { handleInputChange } from './helpers';

export default class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        };
        this.handleInputChange = handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const requestJson = new RequestJson();
        requestJson.post('todos.json', this.state)
            .then(response => {
                this.props.prependTask(response.data);
                this.setState({
                    title: '',
                    description: '',
                });
            });
    }

    render() {
        return (
            <form className="bb bw1">
                <label className="pb2 db f4">Title</label>
                <input className="b--black-80 f4 pa1 bw1 mb2 db w-100"
                       name="title" value={this.state.title}
                       onChange={this.handleInputChange} title="title"/>
                <label className="pb2 db f4">Description</label>
                <input className="b--black-80 f4 pa1 bw1 mb2 db w-100"
                       name="description" value={this.state.description}
                       onChange={this.handleInputChange} title="Description"/>
                <p><input
                    className="bg-black white b--black hover-bg-blue pointer bn pa2 f4"
                    type="submit" value="Submit" onClick={this.handleSubmit}/>
                </p>
            </form>
        );
    }
}
