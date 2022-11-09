import React, { useEffect, useState } from "react"
import Plan from "./Plan"

const Plans = ({workoutInstructions}) => {

    console.log("Workout instructions in Plans.js" )
    console.log(workoutInstructions)


    const [trainingPlans, setTrainingPlans] = useState([]);

    var trainingPlanDivs = trainingPlans.map(function(trainingPlan){
        return <Plan
            trainingPlan={trainingPlan}
            workoutInstructions={workoutInstructions}/>
      })

    useEffect(() => {
        fetch("http://localhost:3000/training-plans/")
        .then((response) => response.json())
        .then((data) => {
            setTrainingPlans(data);
            })
    }, []);

    return(
        <div id="plan-selector">
            <div></div>
            <div className="table-heading">Plan</div>
            <div className="table-heading">Description</div>
            <div className="table-heading">Prerequisites</div>
            {trainingPlanDivs}
        </div>
    )
}

export default Plans