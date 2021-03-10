import React from 'react';

export default class DatePicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            day: "",
            month: "",
            year: ""
        }

        this.convertMonth = this.convertMonth.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.monthData = this.monthData.bind(this);
    }

    componentDidMount(){
        const date = new Date()
        this.setState({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        })
    }

    convertMonth(month) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month];
    }

    changeMonth(event) {
        event.preventDefault();
        const month = event.target.name === "back" ? this.state.month -= 1 : this.state.month += 1;
        this.setState({
            month: month > 11 ? 0 : month < 0 ? 11 : month,
            year: month > 11 ? this.state.year += 1 : month < 0 ? this.state.year -= 1 : this.state.year
        });
    }

    monthData(year, month){
        const numDays = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month).getDay();
        const numRows = Math.ceil((numDays - (7 - firstDay))/7) + 1;
        const monthData = [];
        for(let i = 0; i < 7*numRows; i++){
            const day = i < firstDay ? new Date(year, month, -(firstDay - 1 - i)) : new Date(year, month, (i - firstDay + 1));
            monthData.push({
                day: day.getDate(),
                month: day.getMonth(),
                year: day.getFullYear()
            });
        }
        return monthData;
    }
    
    render(){
        return(
            <div className="date-picker">
                <button name="back" onClick={this.changeMonth}>Back</button>
                <h1>{this.convertMonth(this.state.month)}</h1>
                <h2>{this.state.year}</h2>
                <button name="forward" onClick={this.changeMonth}>Forward</button>
                <div className="calendar">
                    {this.monthData(this.state.year, this.state.month).map(day => 
                        <div className="day">{day.day}</div>    
                    )}
                </div>
            </div>
        )
    }
}