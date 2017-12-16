import React, { Component } from 'react';
import Request from './Request';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        const request = new Request();
        request.getData(this.props.pagination[evt.target.id],
            this.props.getResponseHandler);
    }

    render() {
        return (
            <nav className="pt3">
                {this.firstPage()}
                {this.lastPage()}
            </nav>
        );
    }

    firstPage() {
        return this.props.pagination.first !== this.props.pagination.current &&
            <div className="dib">
                <button onClick={this.handleClick} id='first'
                        className="bg-black white b--black pointer hover-bg-blue bn pa2 f4 mr1">First
                </button>
                <button onClick={this.handleClick} id='prev'
                        className="bg-black white b--black pointer hover-bg-blue bn pa2 f4 mr1">Prev
                </button>
            </div>;

    }

    lastPage() {
        return this.props.pagination.last !== this.props.pagination.current &&
            <div className="dib">
                <button onClick={this.handleClick} id='next'
                        className="bg-black white b--black pointer hover-bg-blue bn pa2 f4 mr1">Next
                </button>
                <button onClick={this.handleClick} id='last'
                        className="bg-black white b--black pointer hover-bg-blue bn pa2 f4">Last
                </button>
            </div>;
    }
}
