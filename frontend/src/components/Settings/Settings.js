import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import "./settings.css";

export default class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            creation: null,
            redirect: "/settings"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        if(sessionStorage.getItem("user")){
            await axios.get(`http://localhost:5000/user/${sessionStorage.getItem("user")}`).then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    creation: res.data.creation
                });
            });
        } else {
            this.setState({
                redirect: "/login"
            });
        }
    }
    
    handleChange(event){
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event){
        event.preventDefault();
        await axios.post(`http://localhost:5000/updateUser`, {
            _id: sessionStorage.getItem("user"),
            name: this.state.name,
            email: this.state.email
        }).then(res => {
            console.log(res);
        });
    }
    
    render(){
        return(
            <div>
                <Navbar />
                <div id="settings">
                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                    <input type="email" value={this.state.email} name="email" onChange={this.handleChange} />
                    <div className="submit-update" onClick={this.handleSubmit} />
                </div>
                <Redirect to={this.state.redirect} />
            </div>
        )
    }
}