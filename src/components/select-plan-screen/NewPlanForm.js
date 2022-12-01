import React, { useState } from "react"
import Button from "../general/Button"

const NewPlanForm = ({onCancel, formTitle, onPlanSelect}) => {
    // Component owns the form to (optionally) select a plan goal, and confirming plan selection
    const [goal, setGoal] = useState("");

    const onSubmit = (e) => {
        // Write the selected plan to the backend on user confirmation
        e.preventDefault();
        onPlanSelect(formTitle, goal);
    }

    return (
        <div className="overlay-form-container">
            <h2 className="table-heading">Start New Plan</h2>
            <h4>{formTitle}</h4>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label>Goal time (optional): </label>
                    <input className="inline" type="text" placeholder="(h:mm:ss)" value={goal} onChange={(e) => setGoal(e.target.value)}/>
                </div>
                <input type="submit" value="Start Plan" className="btn"/>
                <Button buttonColor="#fff" text="Cancel" onClick={onCancel}/>
            </form>
            <p className="warning-txt">Starting a new plan will overwrite your current plan</p>
        </div>
    );
}

export default NewPlanForm;