import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './dashboard';
import Folder from '../Folder/Folder';
import FolderModal from './FolderModal';
import AssignmentModal from './AssignmentModal';
import '../App/global.css';

//Jack Saysana

export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            folders: [],
            AssignmentModalVisible: false,
            FolderModalVisible: false,
            redirect: '/user'
        }
        this.newAssingment = this.newAssingment.bind(this);
        this.newFolder = this.newFolder.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    newAssingment(event){
        event.preventDefault();
        this.setState({
            AssignmentModalVisible: true,
            FolderModalVisible: false
        });
        document.getElementsByClassName("blur")[0].style.display="block";
    }

    newFolder(event){
        event.preventDefault();
        this.setState({
            FolderModalVisible: true,
            AssignmentModalVisible: false
        });
        document.getElementsByClassName("blur")[0].style.display = "block";
    }

    closeModal(){
        this.setState({
            FolderModalVisible: false,
            AssignmentModalVisible: false
        });
        document.getElementsByClassName("blur")[0].style.display = "none";
    }

    render() {
        return(
            <div id="dashboard">
                <button onClick={this.newAssingment}>New Assignment</button>
                <div>
                    {this.state.folders.map(folder =>
                        <Folder name={folder.name} id={folder._id} key={folder._id} />
                    )}
                </div>
                <button onClick={this.newFolder}>New Folder</button>
                <Redirect to={this.state.redirect} />
                <div class="blur"></div>
                <FolderModal visible={this.state.FolderModalVisible} closeModal={this.closeModal} />
                <AssignmentModal visible={this.state.AssignmentModalVisible} closeModal={this.closeModal} folders={this.state.folders} />
            </div>
        )
    }
}