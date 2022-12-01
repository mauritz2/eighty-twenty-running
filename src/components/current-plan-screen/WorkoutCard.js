import React, { useEffect } from "react"
import foundation from "../../static/foundation-2.png"
import hillRepetition from "../../static/hill-repetition-2.png"
import speedPlay from "../../static/speed-play-2.png"
import race from "../../static/race-2.png"
import rest from "../../static/rest.png"
import longRun from "../../static/long-run-3.png"
import recovery from "../../static/recovery.png"
import fastFinish from "../../static/fast-finish.png"
import shortInterval from "../../static/short-interval.png"
import longInterval from "../../static/long-interval.png"
import { useState } from "react";

const Workout = ({workout, onToggle}) => {

    const [instructions, setInstructions] = useState([]);
    const [icon, setIcon] = useState("");

    let all_phases = [];

    instructions.map((instruction) => {
        let single_instruction = []

        instruction.split(" ").map((word) => {
            if (word.includes("Zone")) {
                
                word = word.replace("Zone", "")
                const zone_num = word.at(0);
                // This catches the ")" that sometimes appears as: "Zone {n})""
                // TODO - remove? This var isn't used.
                const remaining = word.slice(1,);

                single_instruction.push(<><span className={"heart-rate-zone-small zone" + zone_num}>{zone_num}</span></>)
            }
            else {
                single_instruction.push(<span>{word} </span>);
            }
        });
        all_phases.push(<p className="phase">{single_instruction}</p>);
    });

    function getIcon(wrkt_title){
        if(wrkt_title.includes("Foundation"))
        {
            return foundation;
        }
        else if(wrkt_title.includes("Hill Repetition"))
        {
            return hillRepetition;
        }
        else if(wrkt_title.includes("Speed Play"))
        {
            return speedPlay;
        }
        else if(wrkt_title.includes("Race"))
        {
            return race;
        }
        else if(wrkt_title.includes("Rest"))
        {
            return rest;
        }
        else if(wrkt_title.includes("Long Run"))
        {
            return longRun;
        }
        else if(wrkt_title.includes("Recovery"))
        {
            return recovery;
        }
        else if(wrkt_title.includes("Fast Finish"))
        {
            return fastFinish;
        }
        else if(wrkt_title.includes("Short Interval"))
        {
            return shortInterval;
        }
        else if(wrkt_title.includes("Long Interval"))
        {
            return longInterval;
        }
    }


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

        let icon_data = getIcon(workout.title);
        setIcon(icon_data);        
      }, []);

    return(
        <div className={`workout-card ${workout.complete ? "complete": ""}`} onDoubleClick={() => onToggle(workout.id)}>
            <img className="workout-icon" src={icon}></img>
            <p className="workout-title"><strong>{workout.title}</strong></p>
            <div className="workout-phases">
                {all_phases} 
            </div>
        </div>
    )
}

export default Workout