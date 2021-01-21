import React from 'react';
//import axios from 'axios';

//Jack Saysana

export default class AssignmentModal extends React.Component {
    constructor(props){
        super(props);
        
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(event){
        event.preventDefault();
        this.props.closeModal();
    }

    render(){
        if(this.props.visible){
            return(
                <div>
                    <button onClick={this.closeModal}>Close</button>
                    <h2>New Assignment</h2>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}