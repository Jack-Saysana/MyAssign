import axios from 'axios';
import React from 'react';

//Jack Saysana

export default class Folder extends React.Component {
    constructor(props){
        super(props)
        this.state={
            assignments: []
        }
    }

    async componentDidMount(){
        await axios.get(`http://localhost:5000/assignments/${sessionStorage.getItem('user')}/${this.props.id}`).then(res => {
            this.setState({
                assignments: res.data.assignments
            })
        });
    }
    
    render(){
        return(
            <div className="folder">
                <label>{this.props.name}</label>
                <ul>
                    {this.state.assignments.map(assignment =>
                        <li key={assignment._id} >{assignment.title}</li>
                    )}
                </ul>
            </div>
        )
    }
}