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