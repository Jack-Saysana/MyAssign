import axios from 'axios';
import React from 'react';
import DatePicker from './DatePicker';
import Assignment from './Assignment';

//Jack Saysana

export default class Folder extends React.Component {
    constructor(props){
        super(props)
        this.state={
            name: this.props.data.name,
            assignments: [],
            title: "",
            notes: "",
            due: undefined,
            dayCount: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.enterListen = this.enterListen.bind(this);
        this.toggleAnnoField = this.toggleAnnoField.bind(this);
        this.passDayCount = this.passDayCount.bind(this);
    }

    async componentDidMount(){
        await axios.get(`http://localhost:5000/assignments/${sessionStorage.getItem('user')}/${this.props.id}`).then(res => {
            this.setState({
                assignments: res.data.assignments
            })
        });
    }

    async handleSubmit() {
        if (this.state.title !== "") {
            await axios.post('http://localhost:5000/assignment', {
                _id: sessionStorage.getItem('user'),
                folder: this.props.id,
                title: this.state.title,
                notes: this.state.notes,
                due: this.state.due
            })
            await axios.get(`http://localhost:5000/assignments/${sessionStorage.getItem('user')}/${this.props.id}`).then(res => {
                this.setState({
                    assignment: res.data.assignments
                })
            })
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    async handleNameChange(event) {
        const value = document.getElementsByClassName("folder-name")[Array.from(document.getElementsByClassName("folder")).indexOf(document.getElementById(this.props.id))].innerHTML;
        this.setState({
            name: value
        });
        if(value !== this.state.name){
            await axios.post('http://localhost:5000/updateFolder', {
                _id: sessionStorage.getItem('user'),
                folder: this.props.id,
                name: value
            });
        }
    }

    changeDate(enabled, date){
        const newDue = enabled ? date : undefined;
        this.setState({
            due: newDue
        });
    }

    enterListen(event) {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    }

    toggleAnnoField(event){
        event.preventDefault();
        const annoField = document.getElementsByClassName("annotations-field")[this.props.index].style;
        document.getElementsByClassName("add-annotations")[this.props.index].style.visibility = annoField.display === "" ? "visible" : "";
        document.getElementsByClassName("add-assignment")[this.props.index].style.borderBottom = annoField.display === "" ? "2px solid #443ab0" : "";
        document.getElementsByClassName("folder")[this.props.index].style.paddingBottom = annoField.display === "" ? "0rem" : "";
        annoField.display = annoField.display === "" ? "flex" : "";
        document.getElementsByClassName("add-assignment")[this.props.index].focus();
    }

    passDayCount(){
        this.props.updateDayCounts(this.props.index, this.state.dayCount);
    }

    render(){
        return(
            <div className="folder" id={this.props.id}>
                <span className="folder-name" onBlur={this.handleNameChange} suppressContentEditableWarning={true} contentEditable>{this.state.name}</span>
                <div className="assignment-list">
                    {this.state.assignments.map(assignment =>
                        <Assignment id={assignment._id} folder={this.props.id} folderIndex={this.props.index} data={assignment} key={assignment._id} />
                    )}
                </div>
                <div className="name-field">
                    <input className="add-assignment add-elem" type="text" name="title" placeholder="New Assignment" autoComplete="off" onBlur={this.toggleAnnotations} onKeyDown={this.enterListen} onChange={this.handleChange} ></input>
                    <div className="add-assignment-button add-elem-button" onClick={this.handleSubmit} />
                    <div className="add-annotations" onClick={this.toggleAnnoField} />
                </div>
                <div className="annotations-field">
                    <div className="close" onClick={this.toggleAnnoField} />
                    <textarea className="notes-input" name="notes" placeholder="Notes..." onChange={this.handleChange} />
                    <DatePicker changeDate={this.changeDate} id={`${this.props.id}_DatePicker`} key={this.props.id} />
                </div>
            </div>
        )
    }
}