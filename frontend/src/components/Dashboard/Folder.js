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
            due: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.enterListen = this.enterListen.bind(this);
        this.toggleAnnoField = this.toggleAnnoField.bind(this);
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
        event.preventDefault();
        document.getElementsByClassName("annotations-field")[this.props.index].style.display = document.getElementsByClassName("annotations-field")[this.props.index].style.display === "block" ? "" : "block";
        document.getElementsByClassName("annotations-field")[this.props.index].style.marginTop = document.getElementsByClassName("annotations-field")[this.props.index].style.marginTop === "3rem" ? "" : "3rem";
        document.getElementsByClassName("folder")[this.props.index].style.paddingBottom = document.getElementsByClassName("folder")[this.props.index].style.paddingBottom === "0rem" ? "" : "0rem";
        document.getElementsByClassName("annotations")[this.props.index].style.visibility = document.getElementsByClassName("annotations")[this.props.index].style.visibility === "visible" ? "" : "visible";
        document.getElementsByClassName("add-assignment")[this.props.index].style.borderBottom = document.getElementsByClassName("annotations")[this.props.index].style.visibility === "visible" ? "2px solid #443ab0" : "";
        document.getElementsByClassName("add-assignment")[this.props.index].focus();
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
                    <div>
                        <input className="add-assignment add-elem" type="text" name="title" placeholder="New Assignment" autoComplete="off" onBlur={this.toggleAnnotations} onKeyDown={this.enterListen} onChange={this.handleChange} ></input>
                        <div className="add-assignment-button add-elem-button" onClick={this.handleSubmit} />
                        <div className="annotations">
                            <div className="add-due" onClick={this.toggleAnnoField} />
                            <div className="add-notes" onClick={this.toggleAnnoField} />
                        </div>
                    </div>
                    <div className="annotations-field">
                        <div className="close" onClick={this.toggleAnnoField} />
                        <textarea className="notes-input" name="notes" placeholder="Notes..." onChange={this.handleChange} />
                        <DatePicker changeDate={this.changeDate} />
                    </div>
                </ul>
            </div>
        )
    }
}