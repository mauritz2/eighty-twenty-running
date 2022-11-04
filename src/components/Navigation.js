import React from "react"

const Navigation = () => {
    return (
    <div>
        <div id="nav-grid">
            <div className="nav-item">
                <h1 id="logo-text"> 80/20 Running </h1>
            </div>
            <div className="nav-item selected">
                <p> Current Plan </p>
            </div>
            <div className="nav-item">
                <p> Configure Plan </p>
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
