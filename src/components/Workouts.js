import React from "react"
import Workout from "./Workout"

const Workouts = ({workouts, onToggle}) => {
    console.log("These workouts are sometimes undefined:")
    console.log(workouts);

    // TODO - Placeholder - needed to prevent component from loading before we have the data
    if(workouts.length === 0){
        return null;
    }

    return(
        <div id="workout-schedule-container">
            <div id="workout-schedule">
                <div className="table-heading">Monday</div>
                <div className="table-heading">Tuesday</div>
                <div className="table-heading">Wednesday</div>
                <div className="table-heading">Thursday</div>
                <div className="table-heading">Friday</div>
                <div className="table-heading">Saturday</div>
                <div className="table-heading">Sunday</div>
        
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