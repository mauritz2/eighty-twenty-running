import React, { useEffect, useState } from "react"
import TrainingPlan from "./TrainingPlan"
import NewPlanForm from "./NewPlanForm"

const Plans = ({onPlanSelect}) => {
    const [trainingPlans, setTrainingPlans] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formTitle, setFormTitle] = useState("");

    const onPlanClick = (planName) => {
        setShowForm(true);

        console.log("This is the planName");
        console.log(planName);

        // Find the human readable name of the training plan to display as the form title        
        trainingPlans.forEach((trainingPlan) => {
            if(trainingPlan.plan_id == planName)
            {
                setFormTitle(trainingPlan.plan_human);
            }
        })

      }

    const onCancel = () => {
        setShowForm(false);
    }

    const closeWindowAndSelectPlan = (formTitle, goal) => {
        onCancel();

        console.log("This is the formTitle");
        console.log(formTitle);

        // TODO - This mapping here andin onPlanClick is clunky. Refactor.
        trainingPlans.forEach((trainingPlan) => {
            console.log("This is the training plan");
            console.log(trainingPlan);
            console.log("This is the form title");
            console.log(formTitle);

            if(trainingPlan.plan_human == formTitle)
            {
                console.log("Found a match")
                // This can only work because the plan_name is unique
                onPlanSelect(trainingPlan.plan_id, goal);
            }
        })        
    }

    var trainingPlanDivs = trainingPlans.map(function(trainingPlan){

        return <TrainingPlan
            key={trainingPlan.id}
            trainingPlan={trainingPlan}
            onPlanClick={onPlanClick}/>
      });

    useEffect(() => {
        fetch("/training-plan-info")
        .then((response) => response.json())
        .then((data) => {
            setTrainingPlans(data);
            })
    }, []);

    return(
        <>
        <div id="plan-selector">
            { showForm && <NewPlanForm onCancel={onCancel} formTitle={formTitle} onPlanSelect={closeWindowAndSelectPlan} /> }
            <div></div>
            <div className="table-heading">Plan</div>
            <div className="table-heading">Description</div>
            <div className="table-heading">Prerequisites</div>
            {trainingPlanDivs}
        </div>
        </>
    )
}

export default Plans