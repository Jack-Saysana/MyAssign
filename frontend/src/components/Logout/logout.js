import React from 'react';
import {Redirect} from 'react-router-dom';

//Jack Saysana

export default class Logout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: sessionStorage.getItem('user') ? '/logout' : '/login'
        }
    }

    componentDidMount(){
        sessionStorage.removeItem('user');
        this.setState({
            redirect: '/login'
        });
    }

    render() {
        return(
            <div>
                <Redirect to={this.state.redirect} />
            </div>
        )
    } 
}