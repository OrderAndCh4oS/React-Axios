import Moment from 'react-moment';
import React from 'react';

export function sortByCompletedAndDate(a, b) {
    if(a.isCompleted === b.isCompleted) {
        return a.createdAt > b.createdAt;
    } else {
        return a.isCompleted - b.isCompleted;
    }
}

export function handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox'
        ? target.checked
        : target.value;
    const name = target.name;

    this.setState({
        [name]: value,
    });
}

export function setParameter(endPoint, name, key) {
    endPoint += '&' + name + '=' + key;
    return endPoint;
}

export function metaDate(label, date) {
    return <p className="f5 i mt0 pt2 fr w-80 tr">
        {label}: <Moment format="MMM Do YYYY, h:mm:ss a">{date}</Moment>
    </p>;
}