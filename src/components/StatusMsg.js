import React from "react"

const StatusMsg = ({planName, currentWeek, goal}) => {
    // TODO - the StatusMsg syntax can be made easier to read
    return(
        <div id="plan-status">
            <p>Plan: {planName}</p>
            <p>Week: {currentWeek}</p>
            {goal ? <p>Goal: {goal}</p>:""}
        </div>
    )
}

export default StatusMsg