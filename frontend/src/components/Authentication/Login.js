import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './authentication.css';

//Jack Saysana

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: '/login'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
    }

    componentDidMount(){
        this.setState({
            redirect: sessionStorage.getItem('user') ? '/user' : '/login' 
        });
    }

    handleEmailChange(event){
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await axios.post('http://localhost:5000/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            sessionStorage.setItem('user', res.data.user._id);
            this.setState({
                redirect: res.data.user ? '/user' : '/login'
            });
        });
    }

    render() {
        return(
            <div className="auth-page">
                <div className="auth-grad"></div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="waves">
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>
                    <p className="logo">MA</p>
                    <h2 className="welcome">Welcome Back</h2>
                    <span className="sub-welcome">Login to continue</span>
                    <input className="field" type="email" name="email" autoComplete="off" onChange={this.handleEmailChange} placeholder="Email Address" required/>
                    <input className="field" type="password" name="password" onChange={this.handlePasswordChange} placeholder="Password" required/>
                    <div class="forgot-pass">
                        <a href="/">Forgot your password?</a>
                    </div>
                    <input className="submit" type="submit" value="Login" />
                    <div className="redirect">
                        <span>Don't have an account?</span><a href="/signup">Sign Up</a>
                    </div>
                </form>
                <Redirect to={this.state.redirect} />
            </div>
        );
    }
}