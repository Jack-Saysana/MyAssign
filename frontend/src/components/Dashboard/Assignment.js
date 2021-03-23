import React from 'react';
import axios from 'axios';

export default class Assignment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            initialTitle: "",
            due: "",
            notes: "",
            completed: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState({
            title: this.props.data.title,
            due: this.props.data.annotations.due,
            notes: this.props.data.annotations.notes
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render(){
        return(
            <input className="title" type="text" value={this.state.title} onChange={this.handleChange} />
        )
    }
}