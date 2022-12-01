import React, { useState, useEffect } from "react"
import WorkoutCard from "./WorkoutCard"

const Week = ({workouts, weekNum, currentWeek, onToggle, defaultOpenWeek}) => {
    // Component for showing an accordion with seven days of workouts from the user's selected plan
    const [open, setOpen] = useState(false);

    function toggleVisibility(){
        // Open or close the accordion
        setOpen(!open);
    }

    useEffect(() => {
        if((defaultOpenWeek === true) && (weekNum === currentWeek)){
            // Default-open the accordion to see the workouts for the current week without any clicks
            setOpen(true);
        }
    }, []);

    return(
        <>
        <button className={open ? "accordion active":"accordion"} onClick={toggleVisibility}>Week {weekNum}</button>
        <div className={open ? "panel block":"panel none"}>
            <div id="workout-schedule-container"> 
                    {workouts.map((workout) => ( 
                        <WorkoutCard
                            key={workout.id}
                            workout={workout}
                            onToggle={onToggle}/>
                        )
                        )
                    }  
            </div>
        </div>
        </>
    );
}

export default Week;