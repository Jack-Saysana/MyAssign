import React from 'react';
import axios from 'axios';

//Jack Saysana

export default class AssignmentModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            folder:"",
            title:"",
            notes:"",
            due:"",
            reocurring: false,

            scheduleVisible: false
        }

        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.schedule = this.schedule.bind(this);
        this.closeSchedule = this.closeSchedule.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        await axios.post('http://localhost:5000/assignment', {
            _id: sessionStorage.getItem('user'),
            title: this.state.title,
            notes: this.state.notes,
            due: this.state.due ? this.state.due : undefined,
            reocurring: this.state.reocurring
        });
    }

    closeModal(event){
        event.preventDefault();
        this.props.closeModal();
    }

    handleChange(event){
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    schedule(event){
        event.preventDefault();
        this.setState({
            scheduleVisible: this.state.scheduleVisible ? false : true
        });
    }

    closeSchedule(event){
        event.preventDefault();
        this.setState({
            scheduleVisible: false
        });
    }

    render(){
        const schedule = this.state.scheduleVisible ? 
        <div name="schedule">
            <button onClick={this.closeSchedule}>Close</button>
            <label>Due Date</label>
            <input type="date" name="due" onChange={this.handleChange} />
            <input type="time" name="time" onChange={this.handleChange} />
            <label>Reocurring</label>
            <input type="boolean" name="reoccurring" />
        </div> : <div></div>;

        if(this.props.visible){
            return(
                <div>
                    <button onClick={this.closeModal}>Close</button>
                    <form onSubmit={this.handleSubmit}>
                        <h2>New Assignment</h2>
                        <label>Folder</label>
                        <input type="" name="folder" required/>
                        <label>Title</label>
                        <input type="text" name="title" onChange={this.handleChange} required/>
                        <label>Notes</label>
                        <input type="text" name="notes" onChange={this.handleChange} />
                        <button onClick={this.schedule}>Schedule</button>
                        {schedule}
                        <input type="submit" value="Create Assignment" />
                    </form>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}