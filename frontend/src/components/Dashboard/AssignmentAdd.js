import React from 'react';
import axios from 'axios';

export default class AssignmentAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            annotations: {
                notes: "",
                due: null,
                reoccuring: false
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.enterListen = this.enterListen.bind(this);
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
                    due: this.state.due,
                    reoccuring: this.state.reoccuring
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

    render(){
        return(
            <div>
                <input className="add-assignment add-elem" type="text" name="title" placeholder="New Assignment" autoComplete="off" onKeyDown={this.enterListen} onChange={this.handleChange} ></input>
                <div className="add-assignment-button add-elem-button" onClick={this.handleSubmit} />
                <div className="annotations">
                    <div className="add-notes" />
                    <div className="add-deadline" />
                    <div className="add-reocurring" />
                </div>
            </div>
        )
    }
}