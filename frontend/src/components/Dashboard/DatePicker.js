import React from 'react';
import Day from './Day';

export default class DatePicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            enabled: false,
            day: "",
            month: "",
            displayedMonth: "",
            year: "",
            displayedYear: ""
        }

        this.toggleDataPicker = this.toggleDataPicker.bind(this);
        this.convertMonth = this.convertMonth.bind(this);
        this.changeDisplayedMonth = this.changeDisplayedMonth.bind(this);
        this.monthData = this.monthData.bind(this);
        this.setDay = this.setDay.bind(this);
    }

    componentDidMount(){
        const date = this.props.currentDate !== null || this.props.currentDate !== undefined ? new Date(this.props.currentDate) : new Date();
        const index = Array.from(document.getElementsByClassName('date-input')).indexOf(document.getElementById(this.props.id));
        const enabled = this.props.currentDate ? true : false;
        const switcher = document.getElementsByClassName("toggle-datepicker")[index].style;
        const slider = document.getElementsByClassName("slider")[index].style;
        const datepicker = document.getElementsByClassName("date-picker")[index];
        const disabler = document.getElementsByClassName("disabler")[index];
        this.setState({
            enabled: this.props.currentDate ? true : false,
            day: date.getDate(),
            month: date.getMonth(),
            displayedMonth: date.getMonth(),
            year: date.getFullYear(),
            displayedYear: date.getFullYear()
        })
        switcher.backgroundColor = enabled ? "#574ae2" : "";
        slider.transform = enabled ? "translateX(15px)" : "";
        disabler.style.display = enabled ? "none" : "";
        if (!this.props.currentDate) {
            datepicker.classList.add("disabled");
        } else {
            datepicker.classList.remove("disabled");
        }
    }

    toggleDataPicker(event){
        event.preventDefault();
        const index = Array.from(document.getElementsByClassName('date-input')).indexOf(document.getElementById(this.props.id));
        const enabled = this.state.enabled ? false: true;
        const switcher = document.getElementsByClassName("toggle-datepicker")[index].style;
        const slider = document.getElementsByClassName("slider")[index].style;
        const datepicker = document.getElementsByClassName("date-picker")[index];
        const disabler = document.getElementsByClassName("disabler")[index];
        switcher.backgroundColor = enabled ? "#574ae2" : "";
        slider.transform = enabled ? "translateX(15px)" : "";
        disabler.style.display = enabled ? "none" : "";
        if (enabled === false) {
            datepicker.classList.add("disabled");
        } else {
            datepicker.classList.remove("disabled");
        }
        this.props.changeDate(enabled, new Date(this.state.year, this.state.month, this.state.day));
        this.setState({
            enabled: enabled
        });
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
        this.props.changeDate(this.state.enabled, new Date(year, month, day));
    }
    
    render(){
        return(
            <div className="date-input" id={this.props.id}>
                <div className="toggler">
                    <div className="toggle-label">Due Date:</div>
                    <div className="toggle-datepicker" onClick={this.toggleDataPicker}>
                        <div className="slider" />
                    </div>
                </div>
                <div className="date-picker disabled">
                    <div className="disabler"></div>
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
                            <Day enabled={this.state.enabled} dayData={day} setDay={this.setDay} id={`${this.props.id}_${index}`} key={`${this.props.id}_${index}`} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}