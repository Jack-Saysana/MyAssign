import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './dashboard';
import Folder from './Folder';
import FolderAdd from './FolderAdd';
import AssignmentModal from './AssignmentModal';
import '../App/global.css';

//Jack Saysana

export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            folders: [],
            AssignmentModalVisible: false,
            redirect: '/user'
        }
        this.newAssingment = this.newAssingment.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.refreshFolders = this.refreshFolders.bind(this);
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

    async refreshFolders(){
        await axios.get(`http://localhost:5000/folders/${sessionStorage.getItem('user')}`).then(res => {
            this.setState({
                folders: res.data.folders
            });
        });
    }

    newAssingment(event){
        event.preventDefault();
        this.setState({
            FolderModalVisible: false
        });
        document.getElementsByClassName("blur")[0].style.display = "block";
        document.getElementsByClassName("blur")[0].style.transitionDuration = ".2s";
    }

    closeModal(){
        this.setState({
            AssignmentModalVisible: false
        });
        document.getElementsByClassName("blur")[0].style.display = "none";
        document.getElementsByClassName("blur")[0].style.transitionDuration = ".2s";
    }

    render() {
        return(
            <div id="dashboard">
                <button onClick={this.newAssingment}>New Assignment</button>
                <div className="side-bar">
                    <h3 className="side-title">Folders</h3>
                    {this.state.folders.map(folder =>
                        <div className="folder-select">
                            <p>
                                {folder.name}
                            </p>
                        </div>
                    )}
                    <FolderAdd refreshFolders={this.refreshFolders} />
                </div>
                <div className="assignment-display">
                    {this.state.folders.map(folder => 
                        <Folder name={folder.name} id={folder._id} key={folder._id} index={this.state.folders.findIndex(elem => elem._id == folder._id)} />  
                    )}
                </div>

                <Redirect to={this.state.redirect} />
                <div className="blur" onClick={this.closeModal}></div>
                <AssignmentModal visible={this.state.AssignmentModalVisible} closeModal={this.closeModal} folders={this.state.folders} />
            </div>
        )
    }
}