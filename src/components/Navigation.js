import React from "react"
import {Link} from "react-router-dom"
import { useLocation } from "react-router-dom"

const Navigation = () => {

    const location = useLocation();

    return (
    <div>
        <div id="nav-grid">
            <div className="nav-item">
                <h1 id="logo-text"> 80/20 Running </h1>
            </div>
            <div className={`nav-item ${location.pathname === "/" ? "selected": ""}`}>
                <p><Link to={"/"}> Current Plan </Link></p>
            </div>
            <div className={`nav-item ${location.pathname === "/choose-plan" ? "selected": ""}`}>
                <p><Link to={"/choose-plan"}> Configure Plan </Link></p>
            </div>
            <div className="nav-item">
                <p> Heart Rate Zones </p>
            </div>
            <div className="nav-item">
                <p> My Account </p>
            </div>
        </div>
        <div className="divider"></div>
    </div>
    )
}

export default Navigation 
