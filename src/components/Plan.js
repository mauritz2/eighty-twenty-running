import React, { useState } from "react"
import Button from "./Button"
import Workouts from "./Workouts"

const Plan = ({trainingPlan, workoutInstructions, onPlanClick}) => {

    const [show, setShow] = useState(false);

    const onViewClick = (id) => {
        // id intentionally not used - it's used for other button funcs
        setShow(!show);
    }

    return(
        <>
            <div>
                <div className="plan-item">
                    <Button
                        text={show ? "Hide Plan" : "View Plan"}
                        color="#fff"
                        onClick={onViewClick}/>
                </div>
                <div className="plan-item">
                    <Button
                        text="Select Plan"
                        color="#F42C04"
                        onClick={onPlanClick}
                        trainingPlanId={trainingPlan.id}/>
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