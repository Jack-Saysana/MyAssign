import React from 'react'
import axios from 'axios'

//Jack Saysana

export default class NewFolder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({
            name: event.target.value
        })
    }

    async handleSubmit(event){
        event.preventDefault();
        await axios.post('http://localhost:5000/folder', {
            _id: sessionStorage.getItem('user'),
            name: this.state.name
        });
    }
    
    render(){
        if(this.props.visible){
            return(
                <form onSubmit={this.handleSubmit}>
                    <h2>New Folder</h2>
                    <label>Name</label>
                    <input type="text" name="name" onChange={this.handleChange} />
                    <input type="submit" value="Create Folder" />
                </form>
            );
        }else{
            return(<div></div>);
        }
    }
}