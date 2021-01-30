import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './signup.css';

//Jack Saysana

export default class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            redirect: '/signup'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    async componentDidMount() {
        this.setState({
            redirect: sessionStorage.getItem('user') ? '/user' : '/signup'
        });
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/signup', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            sessionStorage.setItem('user', res.data.user._id);
            this.setState({
                redirect: res.data.user ? '/user' : '/signup'
            });
        });
    }

    render() {
        return(
            <div>
                <form className="container form" onSubmit={this.handleSubmit} >
                    <label>name</label>
                    <input type="text" name="name" onChange={this.handleNameChange} required/>
                    <label>Email</label>
                    <input type="email" name="email" onChange={this.handleEmailChange} required/>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handlePasswordChange} required/>
                    <input type="submit" value="signup" />
                </form>
                <Redirect to={this.state.redirect} />
            </div>
        );
    }
}