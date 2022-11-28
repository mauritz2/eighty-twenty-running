import React from "react"

const StatusMsg = ({name, currentWeek, totalWeeks, distance, goal}) => {
    // TODO - the StatusMsg syntax can be made easier to read
    return(
        <p className="statusMessage">Hi {name}, you are on <span className="highlight-text">week {currentWeek} </span> of your {totalWeeks} week plan to run <span className="highlight-text">{distance} km</span>{goal ? ' in ':""}{goal ? <span className="highlight-text">{goal}</span>:""}</p>
    )

}

export default StatusMsg