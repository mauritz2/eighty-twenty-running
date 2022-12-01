import React, { useEffect, useState } from "react"
import TrainingPlan from "./TrainingPlan"
import NewPlanForm from "./NewPlanForm"

const TrainingPlans = ({onPlanSelect}) => {
    // Component owns the display of selectable training plans, and to manage selection of a new plan
    const [trainingPlans, setTrainingPlans] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formTitle, setFormTitle] = useState("");

    const onPlanClick = (planName) => {
        // Show the plan confirmation form
        setShowForm(true);
        trainingPlans.forEach((trainingPlan) => {
            // Find the human readable name of the training plan to display as the form title        
            if(trainingPlan.plan_id == planName){
                setFormTitle(trainingPlan.plan_human);
            }
        });
      }

    const onCancel = () => {
        // Close the plan confirmation pop-up on cancel
        setShowForm(false);
    }

    const selectPlan = (selectedPlan, goal) => {
        onCancel();
        console.log("Plan has been selected: " + selectedPlan);
        trainingPlans.forEach((trainingPlan) => {
            // Find the ID of the plan that was selected - needed for backend to update
            if(trainingPlan.plan_human == selectedPlan){
                onPlanSelect(trainingPlan.plan_id, goal);
            }
        });        
    }

    useEffect(() => {
        // Get high-level training plan info (e.g. plan description, prerequisites)
        fetch("/training-plan-info")
        .then((response) => response.json())
        .then((data) => {
            setTrainingPlans(data);
            });
    }, []);

    var trainingPlanDivs = trainingPlans.map(function(trainingPlan){
        // Create a TrainingPlan component for each plan
        return <TrainingPlan
            key={trainingPlan.id}
            trainingPlan={trainingPlan}
            onPlanClick={onPlanClick}/>
      });

    return(
        <>
        <div id="plan-selector">
            { showForm && <NewPlanForm onCancel={onCancel} formTitle={formTitle} onPlanSelect={selectPlan} /> }
            <div></div>
            <div className="table-heading">Plan</div>
            <div className="table-heading">Description</div>
            <div className="table-heading">Prerequisites</div>
            {trainingPlanDivs}
        </div>
        </>
    );
}

export default TrainingPlans;