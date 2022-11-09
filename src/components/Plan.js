import React, { useState } from "react"
import Button from "./Button"
import Workouts from "./Workouts"

const Plan = ({trainingPlan, workoutInstructions}) => {

    const [show, setShow] = useState(false);

    const onViewClick = () => {
        setShow(!show);
    }

    const onPlanChoice = (id) => {
        console.log("You choose plan" + id);
    }

    return(
        <>
            <div>
                <div className="plan-item">
                    <Button
                        text={show ? "Hide Plan" : "View Plan"}
                        color="#fff"
                        onViewClick={onViewClick}/>
                </div>
                <div className="plan-item">
                    <Button
                        text="Select Plan"
                        color="#F42C04"
                        onViewClick={onViewClick}/>
                </div>
            </div>
            <div className="plan-item">{trainingPlan.name}</div>
            <div className="plan-item">{trainingPlan.description}</div>
            <div className="plan-item">{trainingPlan.prerequisites}</div>
            {show === true ?
                <div className="plan-item full">
                    <Workouts
                        workouts={workoutInstructions}
                        onToggle={false}/>
                </div>
            : <></>}
        </>
    )
}

export default Plan;