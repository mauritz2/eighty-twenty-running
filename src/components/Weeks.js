import React from "react"
import Week from "./Week"

const Weeks = ({workouts, onToggle, defaultOpenWeek}) => {

    
    // TODO - factor to remove this Component. Move its logic to App.js.
    function divideIntoWeeks(wrkts){
        // Partition workouts into weeks so each one can be in its own accordion
        let all_weeks = {}
        let one_week = []
        
        // This could be made redundant if the db split worksout by week
        // E.g. by introducing week num as a column
        for(let i=1; i<wrkts.length + 1; i++)
        {   
            one_week.push(wrkts[i - 1]);

            if((i % 7) === 0){
                let week_num = Math.floor(i / 7);
                all_weeks[week_num] = one_week;
                one_week = [];
            }            
        }

        let components = []

        for ( const [key, value] of Object.entries(all_weeks)){

            components.push(
            <Week
                workouts={value}
                weekNum={key}
                currentWeek={"1"}
                onToggle={onToggle}
                defaultOpenWeek={defaultOpenWeek} />)            
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

export default Weeks