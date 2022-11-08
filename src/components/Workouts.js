import React from "react"
import Workout from "./Workout"

const Workouts = ({workouts, onToggle}) => {

    // TODO - Placeholder - needed to prevent component from loading before we have the data
    if(workouts.length === 0){
        return null;
    }

    return(
        <div id="workout-schedule-container">
            <div id="workout-schedule">
                <div className="day-heading">Monday</div>
                <div className="day-heading">Tuesday</div>
                <div className="day-heading">Wednesday</div>
                <div className="day-heading">Thursday</div>
                <div className="day-heading">Friday</div>
                <div className="day-heading">Saturday</div>
                <div className="day-heading">Sunday</div>
        
                {workouts.map((workout) => ( 
                    <Workout
                        key={workout.id}
                        workout={workout}
                        onToggle={onToggle}/>
                    )
                    )
                }
                
            </div>
        </div> 
    )
}

export default Workouts