import React from "react"
import WorkoutCard from "./WorkoutCard"

const Workouts = ({workouts, onToggle}) => {
    // TODO - Placeholder - needed to prevent component from loading before we have the data
    /* if(workouts.length === 0){
        return null;
    }*/
    return(
            <div id="workout-schedule-container">
                <div className="table-heading">Mon</div>
                <div className="table-heading">Tue</div>
                <div className="table-heading">Wed</div>
                <div className="table-heading">Thu</div>
                <div className="table-heading">Fri</div>
                <div className="table-heading">Sat</div>
                <div className="table-heading">Sun</div>
        
                {workouts.map((workout) => ( 
                    <WorkoutCard
                        key={workout.id}
                        workout={workout}
                        onToggle={onToggle}/>
                    )
                    )
                }
                
            </div>
    )
}

export default Workouts