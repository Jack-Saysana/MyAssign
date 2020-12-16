import React from 'react';
import {Redirect} from 'axios';
import axios from 'axios';

export default class signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            redirect: '/signup'
        }
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
            console.log(res);
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit} >
                    <label>name</label>
                    <input type="text" name="name" />
                    <label>Email</label>
                    <input type="email" name="email" />
                    <label>Password</label>
                    <input type="password" name="password" />
                </form>
                <Redirect to={this.state.redirect} />
            </div>
        );
    }
}