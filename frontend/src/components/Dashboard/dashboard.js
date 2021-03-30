import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import update from 'react-addons-update';
import Folder from './Folder';
import FolderAdd from './FolderAdd';
import '../App/global.css';
import './dashboard.css';

//Jack Saysana

export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            folders: [],
            dayCounts: [],
            AssignmentModalVisible: false,
            redirect: '/user'
        }
        this.newAssingment = this.newAssingment.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.refreshFolders = this.refreshFolders.bind(this);
        this.updateDayCounts = this.updateDayCounts.bind(this);
    }

    async componentDidMount(){
        if(sessionStorage.getItem('user')){
            await axios.get(`http://localhost:5000/folders/${sessionStorage.getItem('user')}`).then(res => {
                this.setState({
                    folders: res.data.folders,
                    dayCounts: Array(res.data.folders.length),
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

    updateDayCounts(index, count){
        this.setState(update(this.state, {
            dayCounts: {
                [index]: {
                    $set: count
                }
            }
        }));
        console.log(this.state.dayCounts);
    }

    render() {
        return(
            <div id="dashboard">
                <button onClick={this.newAssingment}>New Assignment</button>
                <div className="side-bar">
                    <h3 className="side-title">Folders</h3>
                    {this.state.folders.map(folder =>
                        <a className="folder-select" href={`#${folder._id}`} key={folder._id}>
                            <div className="select-content">
                                {folder.name}
                            </div>
                        </a>
                    )}
                    <FolderAdd refreshFolders={this.refreshFolders} />
                </div>
                <div className="assignment-display">
                    {this.state.folders.map(folder => 
                        <Folder id={folder._id} data={folder} index={this.state.folders.findIndex(elem => elem._id === folder._id)} updateDayCounts={this.updateDayCounts} key={folder._id} />
                    )}
                </div>

                <Redirect to={this.state.redirect} />
            </div>
        )
    }
}