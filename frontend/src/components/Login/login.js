import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input type="text" name="email" onChange={this.handleEmailChange} required/>
                    <label>Password</label>
                    <input type="password" name="password" onChange={this.handlePasswordChange} required/>
                    <input type="submit" value="login" />
                </form>
                <Redirect to={this.state.redirect} />
            </div>
        );
    }
}