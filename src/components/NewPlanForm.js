import React, { useState } from "react"
import Button from "./Button"

const NewPlanForm = ({onCancel, formTitle, onPlanSelect}) => {
    const [goal, setGoal] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        onPlanSelect(formTitle, goal);
    }
    // TODO - refactor - should both buttons in this form be components maybe?
    return (
        <div className="overlay-form-container">
            <h2>Start New Plan</h2>
            <h4>{formTitle}</h4>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label>Goal time (optional): </label>
                    <input className="inline" type="text" placeholder="(h:mm:ss)" value={goal} onChange={(e) => setGoal(e.target.value)}/>
                </div>
                <input type="submit" value="Start Plan" className="btn"/>
                <Button buttonColor="#fff" text="Cancel" onClick={onCancel}/>
            </form>
            <p className="small">Starting a new plan will overwrite your current plan</p>
        </div>
    )
}

export default NewPlanForm;