import React, { useState, useEffect } from "react"
import WorkoutCard from "./WorkoutCard"

const Week = ({workouts, weekNum, currentWeek, onToggle}) => {

    const [open, setOpen] = useState(false);

    function toggleVisibility() {
        setOpen(!open);
    }

    useEffect(() => {
        if(weekNum === currentWeek){
            // Default-open the accordion for the current week
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