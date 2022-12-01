import React from "react"
import {Link} from "react-router-dom"
import { useLocation } from "react-router-dom"

const Navigation = () => {
    // Top navigation bar to navigate between pages 
    const location = useLocation();

    return (
    <div>
        <div id="nav-grid">
            <div className="nav-item">
                <h1 id="logo-text"> 80/20 Running </h1>
            </div>
            <div className={`nav-item ${location.pathname === "/" ? " selected": ""}`}>
                <p className="nav-link"><Link to={"/"}> Current Plan </Link></p>
            </div>
            <div className={`nav-item ${location.pathname === "/choose-plan" ? " selected": ""}`}>
                <p><Link to={"/choose-plan"}> Select Plan </Link></p>
            </div>
            <div className={`nav-item ${location.pathname === "/configure-heart-rate" ? " selected": ""}`}>
                <p><Link to={"/configure-heart-rate"}> Heart Rate Zones </Link></p>
            </div>
        </div>
        <div className="divider"></div>
    </div>
    );
}

export default Navigation;
