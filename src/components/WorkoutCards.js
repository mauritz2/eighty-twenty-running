import React from "react"
import WorkoutCard from "./WorkoutCard"
import Week from "./Week"

const Workouts = ({workouts, onToggle}) => {

    function divideIntoWeeks(wrkts){
        // Partition workouts into weeks so each one can be in its own accordion
        let all_weeks = {}
        let one_week = []
        
        for(let i=0; i<wrkts.length; i++)
        {
            if((i % 7) == 0){
                let week_num = Math.floor(i / 7) + 1;
                all_weeks[week_num] = one_week;
                one_week = [];
            }

            one_week.push(wrkts[i]);
            
        }

        let components = []

        for ( const [key, value] of Object.entries(all_weeks)){
            
            console.log("My key and type");
            console.log(key);
            console.log(typeof(key));

            components.push(
            <Week
                workouts={value}
                weekNum={key} />)            
        }

        return components;
    }

    let weekComponents = divideIntoWeeks(workouts);

    /*
    {workouts.map((workout) => ( 
        <WorkoutCard
            key={workout.id}
            workout={workout}
            onToggle={onToggle}/>
        )
        )
    */

    return(
            <div>
                {weekComponents}
            </div>
    )
}

export default Workouts