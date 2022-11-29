import React, { useState } from "react"
import WorkoutCard from "./WorkoutCard"

const Week = ({workouts, weekNum}) => {

    const [open, setOpen] = useState(true);

    function toggleVisibility() {
        setOpen(!open);
    }



    workouts = workouts.slice(0, 7);
    console.log(typeof(workouts));
    return(
        <>
        <button className={open ? "accordion active":"accordion"} onClick={toggleVisibility}>Week {weekNum}</button>
        <div className={open ? "panel block":"panel none"}>
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
                            workout={workout}/>
                        )
                        )
                    }  
            </div>
        </div>
        </>
    );
}

export default Week;