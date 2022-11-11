import React, { useState } from "react"
import Button from "./Button"

const NewPlanForm = ({onCancel, formTitle, onPlanSelect}) => {

    const [goal, setGoal] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        onPlanSelect(formTitle);
    }

    return (
        <div className="overlay-form-container">
            <h2>Detail your plan</h2>
            <h4>{formTitle}</h4>
            <form className="add-form" onSubmit={onSubmit}>
                <div className="form-control">
                    <label>Goal time</label>
                    <input type="text" placeholder="Add goal (hh:mm:ss)" value={goal} onChange={(e) => setGoal(e.target.value)}/>
                </div>
                <p><small>Warning: starting a new plan will overwrite your current plan</small></p>
                <input type="submit" value="Start Plan" className="btn"/>
                <Button color="#fff" text="Cancel" onClick={onCancel}/>
            </form>
        </div>
    )
}

export default NewPlanForm;