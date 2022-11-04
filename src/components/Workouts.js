import React from "react"
import Workout from "./Workout"

const Workouts = ({workouts}) => {

    // TODO - Placeholder - needed to prevent component from loading before we have the data
    if(workouts.length === 0){
        return null;
    }

    return(
        <div id="workout-schedule-container">
            <div id="workout-schedule">
                <div>Week</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
                <div>Total</div>
        
                {workouts["week 1"].map((workout) => ( 
                    <Workout
                        key={workout.id}
                        title={workout.title}/>
                    )
                    )
                }
                
            </div>
        </div> 
    )
}

export default Workouts