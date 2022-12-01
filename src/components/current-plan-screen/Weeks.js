import React from "react"
import Week from "./Week"

const Weeks = ({workouts, onToggle, defaultOpenWeek}) => {
    // This component owns splitting workout data into weeks.
    // This can't be done at the App.js level because the worksout by week is also needed
    // when browsing available plans before selecting them. A better solution would be to group
    // workouts by week on the backend. To consider for the future. 
    
    function divideIntoWeeks(wrkts){
        // Partition workouts into groups by seven so each one can be placed in its own accordion
        let all_weeks = {};
        let one_week = [];
        
        for(let i=1; i<wrkts.length + 1; i++)
        {   
            one_week.push(wrkts[i - 1]);

            if((i % 7) === 0){
                let week_num = Math.floor(i / 7);
                all_weeks[week_num] = one_week;
                one_week = [];
            }            
        }

        let week_components = [];

        for (const [weekNum, week_of_workouts] of Object.entries(all_weeks)){
            week_components.push(
            <Week
                workouts={week_of_workouts}
                weekNum={weekNum}
                currentWeek={"1"}
                onToggle={onToggle}
                defaultOpenWeek={defaultOpenWeek} />);            
        }

        return week_components;
    }

    let weekComponents = divideIntoWeeks(workouts);

    return(
        <div>
            {weekComponents}
        </div>
    );
}

export default Weeks;