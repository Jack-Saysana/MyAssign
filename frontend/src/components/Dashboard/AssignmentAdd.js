import React from 'react';
import axios from 'axios';

export default class AssignmentAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            annotations: {
                notes: "",
                due: null
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.enterListen = this.enterListen.bind(this);
        this.showAnnoField = this.showAnnoField.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.title !== ""){
            axios.post('http://localhost:5000/assignment', {
                _id: sessionStorage.getItem('user'),
                folder: this.props.folder,
                title: this.state.title,
                annotations: {
                    notes: this.state.notes,
                    due: this.state.due
                }
            })
        }
    }

    handleChange(event){
        event.preventDefault();
        this.setState({
            title: event.target.value
        });
    }

    enterListen(event){
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    }

    showAnnoField(event){
        event.preventDefault();
        document.getElementsByClassName("annotations-field")[this.props.index].style.display = "block";
        document.getElementsByClassName("annotations-field")[this.props.index].style.marginTop = "3rem";
        document.getElementsByClassName("folder")[this.props.index].style.paddingBottom = "0rem";
        document.getElementsByClassName("annotations")[this.props.index].style.visibility = "visible";
        document.getElementsByClassName("add-assignment")[this.props.index].style.borderBottom = "2px solid #443ab0";
    }

    render(){
        return(
            <div>
                <input className="add-assignment add-elem" type="text" name="title" placeholder="New Assignment" autoComplete="off" onBlur={this.toggleAnnotations} onKeyDown={this.enterListen} onChange={this.handleChange} ></input>
                <div className="add-assignment-button add-elem-button" onClick={this.handleSubmit} />
                <div className="annotations">
                    <div className="add-due" onClick={this.showAnnoField} />
                    <div className="add-notes" onClick={this.showAnnoField} />
                </div>
            </div>
        )
    }
}