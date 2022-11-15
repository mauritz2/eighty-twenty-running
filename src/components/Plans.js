import React, { useEffect, useState } from "react"
import Plan from "./Plan"
import NewPlanForm from "./NewPlanForm"
import { json } from "react-router-dom";

const Plans = ({onPlanSelect}) => {
    const [wrkoutInstructions, setWrkoutInstructions] = useState({});
    const [trainingPlans, setTrainingPlans] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formTitle, setFormTitle] = useState("");

    const onPlanClick = (planName) => {
        setShowForm(true);
        setFormTitle(planName);
      }

    const onCancel = () => {
        setShowForm(false);
    }

    const closeWindowAndSelectPlan = (formTitle) => {
        onCancel();
        onPlanSelect(formTitle);
    } 

    var trainingPlanDivs = trainingPlans.map(function(trainingPlan){

        return <Plan
            key={trainingPlan.id}
            trainingPlan={trainingPlan}
            onPlanClick={onPlanClick}/>
      });

    useEffect(() => {
        fetch("http://localhost:3000/training-plans/")
        .then((response) => response.json())
        .then((data) => {
            setTrainingPlans(data);
            })
    }, []);

    return(
        <div id="plan-selector">
            { showForm && <NewPlanForm onCancel={onCancel} formTitle={formTitle} onPlanSelect={closeWindowAndSelectPlan} /> }
            <div></div>
            <div className="table-heading">Plan</div>
            <div className="table-heading">Description</div>
            <div className="table-heading">Prerequisites</div>
            {trainingPlanDivs}
        </div>
    )
}

export default Plans