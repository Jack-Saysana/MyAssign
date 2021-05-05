import React from 'react';
import axios from 'axios';
import DatePicker from './DatePicker';

//Jack Saysana

export default class Assignment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.data.title,
            due: this.props.data.annotations.due,
            notes: this.props.data.annotations.notes,
            completed: this.props.data.completed
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
        this.handleNotesUpdate = this.handleNotesUpdate.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.toggleAnnoDisplay = this.toggleAnnoDisplay.bind(this);
        this.deleteAssignment = this.deleteAssignment.bind(this);
    }

    componentDidMount(){
        const completeButton = document.getElementsByClassName("completed")[Array.from(document.getElementsByClassName("assignment")).indexOf(document.getElementById(this.props.id))].style;
        completeButton.backgroundColor = this.state.completed ? "#6254ff" : "";
    }

    componentDidUpdate(){
        const completeButton = document.getElementsByClassName("completed")[Array.from(document.getElementsByClassName("assignment")).indexOf(document.getElementById(this.props.id))].style;
        completeButton.backgroundColor = this.state.completed ? "#6254ff" : "";
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleTitleUpdate(event){
        const value = document.getElementsByClassName("assignment-title")[Array.from(document.getElementsByClassName("assignment")).indexOf(document.getElementById(this.props.id))].innerHTML;
        this.setState({
            title: value
        });
        if(value !== this.state.title){
            await axios.post('http://localhost:5000/updateAssignment', {
                _id: sessionStorage.getItem('user'),
                folder: this.props.folder,
                assignment: this.props.id,
                title: value,
                completed: this.state.completed
            })
        }
    }

    async handleNotesUpdate(event){
        event.preventDefault();
        this.setState({
            notes: event.target.value
        });
        await axios.post('http://localhost:5000/updateAssignment', {
            _id: sessionStorage.getItem('user'),
            folder: this.props.folder,
            assignment: this.props.id,
            notes: event.target.value,
            completed: this.state.completed
        });
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

    toggleAnnoDisplay(event){
        const annoDisplay = document.getElementsByClassName("annotations-display")[Array.from(document.getElementsByClassName("assignment")).indexOf(document.getElementById(this.props.id))].style;
        const toggleButton = document.getElementsByClassName("assignment-annotations")[Array.from(document.getElementsByClassName("assignment")).indexOf(document.getElementById(this.props.id))].style;
        toggleButton.transform = annoDisplay.display === "" ? "rotate(90deg)" : "";
        annoDisplay.display = annoDisplay.display === "" ? "flex" : "";
    }

    async deleteAssignment(event){
        event.preventDefault();
        await axios.delete('http://localhost:5000/deleteAssignment', {
            data: {
                _id: sessionStorage.getItem('user'),
                folder: this.props.folder,
                assignment: this.props.id
            }
        });
        this.props.updateList();
    }

    render(){
        return(
            <div className="assignment" id={this.props.id}>
                <div className="title-update">
                    <div className="completed" onClick={this.toggleCompletion} />
                    <span className="assignment-title elem-title" onBlur={this.handleTitleUpdate} suppressContentEditableWarning={true} spellcheck="false" contentEditable>{this.state.title}</span>
                    <div className="assignment-annotations" onClick={this.toggleAnnoDisplay} />
                </div>
                <div className="annotations-display">
                    <textarea className="notes-input" name="notes" value={this.state.notes} placeholder="Notes..." onBlur={this.handleNotesUpdate} onChange={this.handleChange} />
                    <DatePicker changeDate={this.updateDate} currentDate={this.state.due} id={`${this.props.id}_DatePicker`} key={this.props.id} />
                    <div className="remove-elem remove-assignment" onClick={this.deleteAssignment} />
                </div>
            </div>
        )
    }
}