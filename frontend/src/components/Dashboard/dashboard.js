import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import update from 'react-addons-update';
import Folder from './Folder';
import FolderAdd from './FolderAdd';
import Navbar from '../Navbar/Navbar'
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
        const folders = await axios.get(`http://localhost:5000/folders/${sessionStorage.getItem('user')}`).then(res => {
            return res.data.folders
        });
        this.setState({
            folders: folders
        })
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
            <div>
                {/*<Navbar />*/}
                <div id="dashboard">
                    <div className="side-bar">
                        <h3 className="side-title">Folders</h3>
                        {this.state.folders.map(folder =>
                            <a className="folder-select" href={`#${folder._id}_target`} key={folder._id}>
                                <div className="select-content">
                                    <span className="select-text">{folder.name}</span>
                                </div>
                            </a>
                        )}
                        <FolderAdd refreshFolders={this.refreshFolders} />
                    </div>
                    <div className="assignment-display">
                        {this.state.folders.map(folder =>
                            <Folder id={folder._id} data={folder} index={this.state.folders.findIndex(elem => elem._id === folder._id)} updateFolderList={this.refreshFolders} updateDayCounts={this.updateDayCounts} key={folder._id} />
                        )}
                    </div>
                    <Redirect to={this.state.redirect} />
                </div>
            </div>
        )
    }
}