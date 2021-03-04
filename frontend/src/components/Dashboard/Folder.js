import axios from 'axios';
import React from 'react';
import AssignmentAdd from './AssignmentAdd';

//Jack Saysana

export default class Folder extends React.Component {
    constructor(props){
        super(props)
        this.state={
            assignments: []
        }
        this.closeAnnoField = this.closeAnnoField.bind(this);
    }

    async componentDidMount(){
        await axios.get(`http://localhost:5000/assignments/${sessionStorage.getItem('user')}/${this.props.id}`).then(res => {
            this.setState({
                assignments: res.data.assignments
            })
        });
    }
    
    closeAnnoField(event){
        event.preventDefault();
        document.getElementsByClassName("annotations-field")[this.props.index].style.display = "";
        document.getElementsByClassName("annotations-field")[this.props.index].style.marginTop = "";
        document.getElementsByClassName("folder")[this.props.index].style.paddingBottom = "";
        document.getElementsByClassName("annotations")[this.props.index].style.visibility = "";
        document.getElementsByClassName("add-assignment")[this.props.index].style.borderBottom = "";
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
                    <AssignmentAdd folder={this.props.id} index={this.props.index} />
                    <div className="annotations-field">
                        <button onClick={this.closeAnnoField}>close</button>
                        <p>test</p>
                        <p>test</p>
                        <p>test</p>
                        <p>test</p>
                    </div>
                </ul>
            </div>
        )
    }
}