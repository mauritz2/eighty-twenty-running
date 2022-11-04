import React from "react"

const StatusMsg = ({name, currentWeek, totalWeeks, distance, goal}) => {

    return(
        <h3>Hi {name}, you are <span className="highlight-text">{currentWeek} weeks</span> into your {totalWeeks} week plan to run <span className="highlight-text">{distance}</span> in <span className="highlight-text">{goal}</span></h3>
    )

}

export default StatusMsg