import React from "react"

const StatusMsg = ({planName, currentWeek, goal}) => {
    //             {goal ? <p>Goal: {goal}</p>:""}
    return(
        <div id="plan-status">
            <div className="msg-header">Plan</div>
            <div className="msg-header">Week</div>
            <div className="msg-header">Goal</div>
            <div className="msg-data">{planName}</div>
            <div className="msg-data">{currentWeek}</div>
            <div className="msg-data">{goal}</div>
        </div>
    )
}

export default StatusMsg