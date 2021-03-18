import React from 'react';
import axios from 'axios';

export default class Assignment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            due: "",
            notes: "",
            completed: false
        }
    }

    componentDidMount(){
        this.setState({
            title: this.props.data.title,
            due: this.props.data.annotations.due,
            notes: this.props.data.annotations.notes
        })
    }

    render(){
        return(
            <input className="title" type="text" />
        )
    }
}