import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './authentication.css';

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
                <div className="auth-grad"></div>
                <form className="form" onSubmit={this.handleSubmit} >
                    <div className="waves">
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>
                    <p className="logo">MA</p>
                    <h2 className="welcome">Welcome</h2>
                    <span className="sub-welcome">Create your MyAssign account</span>
                    <input className="field" type="text" name="name" autoComplete="off" onChange={this.handleNameChange} placeholder="Name" required/>
                    <input className="field" type="email" name="email" autoComplete="off" onChange={this.handleEmailChange} placeholder="Email Address" required/>
                    <input className="field" type="password" name="password" onChange={this.handlePasswordChange} placeholder="Password" required/>
                    <input className="submit" type="submit" value="Sign Up" />
                    <div className="redirect">
                        <span>Already have an account?</span><a href="/login">Login</a>
                    </div>
                </form>
                <Redirect to={this.state.redirect} />
            </div>
        );
    }
}