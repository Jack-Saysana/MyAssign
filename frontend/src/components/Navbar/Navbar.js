import React from "react";
import "./Navbar.css";

//Jack Saysana

export default class Navbar extends React.Component {
    render(){
        return(
            <div id="Navbar">
                <div className="wave normal" />
                <div className="wave offset" />
                <div className="center-redirects">
                    <div className="redirect dashboard-redirect" />
                    <div className="redirect calendar-redirect" />
                </div>
                <div className="wave-reverse normal-reverse" />
                <div className="wave-reverse offset" />
            </div>
        )
    }
}