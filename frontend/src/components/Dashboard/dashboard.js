import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import Folder from '../Folder/Folder';
import NewFolder from './NewFolder';

//Jack Saysana

export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            folders: [],
            newFolderVisible: false,
            redirect: '/user'
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        if(sessionStorage.getItem('user')){
            await axios.get(`http://localhost:5000/folders/${sessionStorage.getItem('user')}`).then(res => {
                this.setState({
                    folders: res.data.folders,
                    redirect: '/user'
                });
            });
        }else{
            this.setState({
                redirect: '/login'
            });
        }
    }

    async handleClick(event){
        event.preventDefault();
        this.setState({
            newFolderVisible: true
        });
    }

    render() {
        return(
            <div>
                <button onClick={this.handleClick}>New Folder</button>
                <div>
                    {this.state.folders.map(folder =>
                        <Folder name={folder.name} id={folder._id} key={folder._id} />
                    )}
                </div>
                <NewFolder visible={this.state.newFolderVisible} />
                <Redirect to={this.state.redirect} />
            </div>
        )
    }
}