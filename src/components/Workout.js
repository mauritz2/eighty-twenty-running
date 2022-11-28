import React, { useEffect } from "react"
import foundation from "../static/foundation.png"
import { useState } from "react";

const Workout = ({workout, onToggle}) => {

    const [instructions, setInstructions] = useState([]);

    let all_phases = [];

    instructions.map((instruction) => {
        let single_instruction = []

        instruction.split(" ").map((word) => {
            if (word.includes("Zone")) {
                
                word = word.replace("Zone", "")
                const zone_num = word.at(0);
                // This catches the ")" that sometimes appears as: "Zone {n})""
                const remaining = word.slice(1,);

                single_instruction.push(<><span className="heartrate-zone">{zone_num}</span></>)
            }
            else {
                single_instruction.push(<span>{word} </span>);
            }
        });
        all_phases.push(<p className="phase">{single_instruction}</p>);
    });

    // It would be better if the backend returned the workout instructions to reduce
    // the amount of fetch requests between backend/frontend (now one per day) -  
    // but more fun to do it in React :-)
    // TODO - update, this approach is visibly slow in the UI. Refactor.
    useEffect(() => {        
        fetch("/workout-phases/" + workout.title)
        .then((response) => response.json())
        .then((workouts) => {
            setInstructions(workouts);
        });        
      }, []);

    return(
        <div className={`workout-box ${workout.complete ? "complete": ""}`} onDoubleClick={() => onToggle(workout.id)}>
            <img className="workout-icon" src={foundation}></img>
            <p className="workout-title"><strong>{workout.title}</strong></p>
            <div className="workout-phases">
                {all_phases} 
            </div>
        </div>
    )
}

export default Workout