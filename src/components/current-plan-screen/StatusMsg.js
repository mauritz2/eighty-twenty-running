import React from "react"

const StatusMsg = ({planName, currentWeek, goal}) => {
    // Component for showing overall plan status information on the top of the main page            
    return(
        <div id="plan-status">
            <div className="msg-header">Plan</div>
            <div className="msg-header">Week</div>
            <div className="msg-header">{goal ?"Goal":""}</div>
            <div className="msg-data">{planName}</div>
            <div className="msg-data">{currentWeek}</div>
            <div className="msg-data">{goal ? goal:""}</div>
        </div>
    )
}

export default StatusMsg;