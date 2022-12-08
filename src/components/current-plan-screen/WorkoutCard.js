import React, { useEffect } from "react"
import { useState } from "react";

// Workout icon imports
import foundation from "../../static/foundation.png"
import hillRepetition from "../../static/hill-repetition.png"
import speedPlay from "../../static/speed-play.png"
import race from "../../static/race.png"
import rest from "../../static/rest.png"
import longRun from "../../static/long-run.png"
import recovery from "../../static/recovery.png"
import fastFinish from "../../static/fast-finish.png"
import shortInterval from "../../static/short-interval.png"
import longInterval from "../../static/long-interval.png"

const WorkoutCard = ({workout, onToggle}) => {
    // This component owns the data and display of each daily workout
    const [instructions, setInstructions] = useState([]);
    const [icon, setIcon] = useState("");

    function getPhasesWithZoneCSS(){
        // Turns the Zone words (e.g. "Zone 1") into CSS circles to illustrate the heart rate zone
        // Without these circles the workout instructions become too long to fit within a card
        let phases_with_css = [];

        instructions.map((instruction) => {
            let single_instruction = []
            instruction.split(" ").map((word) => {
                if (word.includes("Zone")) {
                    word = word.replace("Zone", "")
                    const zone_num = word.at(0);
                    single_instruction.push(<><span className={"heart-rate-zone-small zone" + zone_num}>{zone_num}</span></>)
                }
                else {
                    single_instruction.push(<span>{word} </span>);
                }
            });
            phases_with_css.push(<p className="phase">{single_instruction}</p>);
        });

        return phases_with_css;
    }

    function getIcon(full_title){
        // Match the text part in the workout name, e.g. "Foundation" in "Foundation 6"
        // Then return the icon for this workout
        let regex = /[a-zA-Z]/g;
        let matches = full_title.match(regex);
        let title = matches.join(""); 

        switch(title) {
            case "Foundation":
                return foundation;
            case "HillRepetition":
                return hillRepetition;
            case "SpeedPlay":
                return speedPlay;
            case "Race":
                return race;
            case "LongRun":
                return longRun;
            case "Recovery":
                return recovery;
            case "FastFinish":
                return fastFinish;
            case "ShortInterval":
                return shortInterval;
            case "LongInterval":
                return longInterval;
            case "Rest":
                return rest;
        }
    }

    // For performance, it would be better if the backend returned the workout phases 
    // as part of a prop. This would mean one request for all instructions vs. one request 
    // for each workout card. But more fun to do it in React :-)
    useEffect(() => {        
        fetch("/api/workout-phases/" + workout.title)
        .then((response) => response.json())
        .then((workouts) => {
            setInstructions(workouts);
        });

        let icon_data = getIcon(workout.title);
        setIcon(icon_data);
    }, []);
    
    let phases_with_css = getPhasesWithZoneCSS();

    return(
        <div className={`workout-card ${workout.complete ? "complete": ""}`} onDoubleClick={() => onToggle(workout.id)}>
            <img className="workout-icon" src={icon}></img>
            <p className="workout-title"><strong>{workout.title}</strong></p>
            <div className="workout-phases">
                {phases_with_css} 
            </div>
        </div>
    )
}

export default WorkoutCard