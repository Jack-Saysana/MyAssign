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
            })
            .then(res => {
                if(res.data.limit)
                {
                    document.getElementsByClassName("add-folder")[0].style.borderBottom = "2px solid #ff0033";
                    document.getElementsByClassName("add-folder-button")[0].style.background = "url('../../images/plus-ff0033.svg')";
                    document.getElementsByClassName("limit-message")[0].style.display = "block";
                }else{
                    document.getElementsByClassName("add-folder")[0].style.borderBottom = "";
                    document.getElementsByClassName("add-folder-button")[0].style.background = "";
                    document.getElementsByClassName("limit-message")[0].style.display = "";
                }
            });
        }
        document.getElementsByClassName('add-folder')[0].value = "";
        this.props.refreshFolders();
    }

    enterListen(event){
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    }
    
    render(){
        return(
            <div className="folder-add">
                <input className="add-folder add-elem" type="text" name="name" placeholder="New Folder" autoComplete="off" onKeyDown={this.enterListen} onChange={this.handleChange} />
                <div className="add-folder-button add-elem-button" onClick={this.handleSubmit} />
                <div className="limit-message">
                    Folder Limit Reached
                </div>
            </div>
        );
    }
}