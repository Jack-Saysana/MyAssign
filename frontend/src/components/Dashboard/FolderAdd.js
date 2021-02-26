import React from 'react'
import axios from 'axios'
import '../App/global.css';
import './dashboard.css';

//Jack Saysana

export default class FolderAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.enterListen = this.enterListen.bind(this);
    }
    
    handleChange(event){
        this.setState({
            name: event.target.value
        })
    }

    async handleSubmit(){
        if(this.state.name !== ""){
            await axios.post('http://localhost:5000/folder', {
                _id: sessionStorage.getItem('user'),
                name: this.state.name
            });
        }
        this.setState();
    }

    enterListen(event){
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    }
    
    render(){
        return(
            <div>
                <div className="add-folder-button" onClick={this.handleSubmit}></div>
                <input className="add-folder" type="text" name="name" placeholder="Add Folder" autoComplete="off" onKeyDown={this.enterListen} onChange={this.handleChange} />
            </div>
        );
    }
}