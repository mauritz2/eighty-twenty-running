import React, { useEffect } from "react"
import foundation from "../static/foundation.png"
import { useState } from "react";

const Workout = ({title}) => {
    const [instructions, setInstructions] = useState([]);
    const instruction_paragraphs = []

    instructions.map((instruction) => {
        const zone_strs_to_replace = ["Zone 1", "Zone 2", "Zone 5"]
        

        while(zone_strs_to_replace.some(el => instruction.includes(el)))
        {   
            var zoneClass;

            if(instruction.includes("Zone 1")){
                zoneClass = "emoji-class-1"
                instruction = instruction.replace("Zone 1", "1️⃣")
            }
            else if(instruction.includes("Zone 2")){
                zoneClass = "emoji-class-2"
                instruction = instruction.replace("Zone 2", "2️⃣")
            }
            else if(instruction.includes("Zone 5")){
                zoneClass = "emoji-class-5"
                instruction = instruction.replace("Zone 5", "5️⃣")
            }

            const regex = "1️⃣|2️⃣|5️⃣";
            const emoji_pos = instruction.search(regex);

            var pre_emoji_str = instruction.slice(0, emoji_pos);
            var emoji = instruction.slice(emoji_pos, emoji_pos + 1);
            var post_emoji_str = instruction.slice(emoji_pos + 1, );
        }
        
        instruction_paragraphs.push(<p>{pre_emoji_str}<span className={zoneClass}>{emoji}</span>{post_emoji_str}</p>)
    }
    )

    // It would be better if the backend returned the workout instructions to reduce
    // the amount of fetch requests between backend/frontend (now one per day) -  
    // but more fun to do it in React :-)
    useEffect(() => {
        fetch("http://localhost:3000/workout_phases/" + title)
        .then((response) => response.json())
        .then((workouts) => {
            setInstructions(workouts["phases"]);
        });
      }, []);

    return(
        <div className="workout-box">
            <p className="workout-title"><strong>{title}</strong></p>
            <img className="workout-icon" src={foundation}></img>
            <div className="workout-phases">
                {instruction_paragraphs} 
            </div>
        </div>
    )
}

export default Workout