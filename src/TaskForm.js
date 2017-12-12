import RequestJson from './RequestJson';
import React, { Component } from 'react';

export default class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const requestJson = new RequestJson();
        requestJson.post('todos.json', this.state)
            .then(response => {
                alert(response);
            });
    }

    render() {
        return (
            <form>
                <label>
                    Title:
                    <input name="title" value={this.state.title}
                           onChange={this.handleInputChange}/>
                </label>
                <br/>
                <label>
                    Discription:
                    <input name="description" value={this.state.numberOfGuests}
                           onChange={this.handleInputChange}/>
                </label>
                <p><input type="submit" value="Submit"
                          onClick={this.handleSubmit}/></p>
            </form>
        );
    }
}
