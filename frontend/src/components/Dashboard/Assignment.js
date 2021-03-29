import React from 'react';
import axios from 'axios';
import DatePicker from './DatePicker';

export default class Assignment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.data.title,
            due: this.props.data.annotations.due,
            notes: this.props.data.annotations.notes,
            completed: this.props.data.completed
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
        this.updateDate = this.updateDate.bind(this);
    }

    componentDidMount(){
        const completeButton = document.getElementsByClassName("completed")[Array.from(document.getElementsByClassName("assignment")).indexOf(document.getElementById(this.props.id))].style;
        completeButton.backgroundColor = this.state.completed ? "#6254ff" : "";
    }

    componentDidUpdate(){
        const completeButton = document.getElementsByClassName("completed")[Array.from(document.getElementsByClassName("assignment")).indexOf(document.getElementById(this.props.id))].style;
        completeButton.backgroundColor = this.state.completed ? "#6254ff" : "";
    }

    async handleTitleChange(event){
        const value = document.getElementsByClassName("title")[Array.from(document.getElementsByClassName("assignment")).indexOf(document.getElementById(this.props.id))].innerHTML;
        this.setState({
            title: value
        });
        await axios.post('http://localhost:5000/updateAssignment', {
            _id: sessionStorage.getItem('user'),
            folder: this.props.folder,
            assignment: this.props.id,
            title: value,
            completed: this.state.completed
        })
    }

    async toggleCompletion(event){
        event.preventDefault();
        const complete = !this.state.completed;
        this.setState({
            completed: complete
        });
        await axios.post('http://localhost:5000/updateAssignment', {
            _id: sessionStorage.getItem('user'),
            folder: this.props.folder,
            assignment: this.props.id,
            title: this.state.title,
            completed: complete
        });
    }

    updateDate(enabled, date) {
        const newDue = enabled ? date : undefined;
        this.setState({
            due: newDue
        });
    }

    render(){
        return(
            <div className="assignment" id={this.props.id}>
                <div className="title-update">
                    <div className="completed" onClick={this.toggleCompletion} />
                    <span className="title" name="title" onBlur={this.handleTitleChange} contentEditable>{this.state.title}</span>
                </div>
                <div className="annotations-display">
                    <textarea className="notes-input" />
                    <DatePicker changeDate={this.updateDate} currentDate={this.state.due} id={`${this.props.id}_DatePicker`} key={this.props.id} />
                </div>
            </div>
        )
    }
}