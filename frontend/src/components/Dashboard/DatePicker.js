import React from 'react';
import Day from './Day';

export default class DatePicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            day: "",
            month: "",
            displayedMonth: "",
            year: "",
            displayedYear: ""
        }

        this.convertMonth = this.convertMonth.bind(this);
        this.changeDisplayedMonth = this.changeDisplayedMonth.bind(this);
        this.monthData = this.monthData.bind(this);
        this.setDay = this.setDay.bind(this);
    }

    componentDidMount(){
        const date = new Date()
        this.setState({
            day: date.getDate(),
            month: date.getMonth(),
            displayedMonth: date.getMonth(),
            year: date.getFullYear(),
            displayedYear: date.getFullYear()
        })
    }

    convertMonth(month) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[month];
    }

    changeDisplayedMonth(event) {
        event.preventDefault();
        const month = event.target.className === "back" ? this.state.displayedMonth - 1 : this.state.displayedMonth + 1;
        this.setState({
            displayedMonth: month > 11 ? 0 : month < 0 ? 11 : month,
            displayedYear: month > 11 ? this.state.displayedYear + 1 : month < 0 ? this.state.displayedYear - 1 : this.state.displayedYear
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
                year: day.getFullYear(),
                active: day.getDate() === this.state.day && day.getMonth() === this.state.month && day.getFullYear() === this.state.year
            });
        }
        return monthData;
    }

    setDay(day, month, year){
        this.setState({
            day: day,
            month: month,
            year: year
        });
    }
    
    render(){
        return(
            <div className="date-picker">
                <div className="month-display">
                    <div className="date">
                        {this.convertMonth(this.state.month)} {this.state.day}, {this.state.year}
                    </div>
                </div>
                <div className="month-changer">
                    <div className="month">{this.convertMonth(this.state.displayedMonth)} {this.state.displayedYear}</div>
                    <div className="shifter-buttons">
                        <div className="back" onClick={this.changeDisplayedMonth} />
                        <div className="forward" onClick={this.changeDisplayedMonth} />
                    </div>
                </div>
                <div className="calendar">
                    {this.monthData(this.state.displayedYear, this.state.displayedMonth).map((day, index) => 
                        <Day dayData={day} setDay={this.setDay} id={`${this.props.folderIndex}_${index}`} key={`${this.props.folderIndex}_${index}`} />
                    )}
                </div>
            </div>
        )
    }
}