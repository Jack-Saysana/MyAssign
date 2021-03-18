import React from 'react';

export default class Day extends React.Component {
    constructor(props){
        super(props);
        this.selectDay = this.selectDay.bind(this);
    }

    componentDidUpdate(){
        const selector = document.getElementsByClassName("selector")[Array.from(document.getElementsByClassName("day")).indexOf(document.getElementById(this.props.id))];
        const dayLabel = document.getElementsByClassName("day-label")[Array.from(document.getElementsByClassName("day")).indexOf(document.getElementById(this.props.id))];
        selector.style.backgroundColor = this.props.dayData.active ? !this.props.enabled ? "rgb(161, 161, 161)" : "#574ae2" : "";
        selector.style.zIndex = this.props.dayData.active ? "3" : "";
        dayLabel.style.color = this.props.dayData.active ? !this.props.enabled ? "#ccc" : "#faf9f9" : "";
        dayLabel.style.fontWeight = this.props.dayData.active ? "bold" : "";
        dayLabel.style.zIndex = this.props.dayData.active ? "99" : "";
    }

    selectDay(event){
        event.preventDefault();
        this.props.setDay(this.props.dayData.day, this.props.dayData.month, this.props.dayData.year);
    }

    render(){
        return(
            <div id={this.props.id} className="day" onClick={this.selectDay}>
                <div className="selector" />
                <div className="day-label">
                    {this.props.dayData.day}
                </div>
            </div>
        )
    }
}