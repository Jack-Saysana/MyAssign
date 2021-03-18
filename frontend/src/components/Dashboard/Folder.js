import axios from 'axios';
import React from 'react';
import DatePicker from './DatePicker';

//Jack Saysana

export default class Folder extends React.Component {
    constructor(props){
        super(props)
        this.state={
            assignments: [],
            title: "",
            notes: "",
            due: null,
            dayCount: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    changeDate(date){
        this.setState({
            due: date
        })
    }

    enterListen(event) {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    }

    toggleAnnoField(event){
        const annoField = document.getElementsByClassName("annotations-field")[this.props.index];
        const folder = document.getElementsByClassName("folder")[this.props.index];
        const addAssignment = document.getElementsByClassName("add-assignment")[this.props.index];
        addAssignment.focus();
    }

    passDayCount(){
        this.props.updateDayCounts(this.props.index, this.state.dayCount);
    }

    render(){
        return(
            <div className="folder">
                <h3>{this.props.name}</h3>
                <ul>
                    {this.state.assignments.map(assignment =>
                        <li key={assignment._id} >{assignment.title}</li>
                    )}
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                </ul>
                <div className="name-field">
                    <input className="add-assignment add-elem" type="text" name="title" placeholder="New Assignment" autoComplete="off" onBlur={this.toggleAnnotations} onKeyDown={this.enterListen} onChange={this.handleChange} ></input>
                    <div className="add-assignment-button add-elem-button" onClick={this.handleSubmit} />
                    <div className="add-annotations" onClick={this.toggleAnnoField} />
                </div>
                <div className="annotations-field">
                    <div className="close" onClick={this.toggleAnnoField} />
                    <textarea className="notes-input" name="notes" placeholder="Notes..." onChange={this.handleChange} />
                    <DatePicker folderIndex={this.props.index} changeDate={this.changeDate} key={this.props.index} />
                </div>
            </div>
        )
    }
}