import React, { useState, useEffect } from "react"
import Button from "./Button"
import Workouts from "./Workouts"

const Plan = ({trainingPlan, onPlanClick}) => {

    const [show, setShow] = useState(false);
    const [workoutDetails, setWorkoutDetails] = useState([]);

    const onViewClick = (id) => {
        // id intentionally not used - it's used for other button funcs
        setShow(!show);
    }

    useEffect(() => {
        fetch("/workouts/5k-level-1") // TODO - bring this back: + trainingPlan.id)
        .then((res) => res.json())
        .then((data) => {
            setWorkoutDetails(data);
        })
    }, []);

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
                        trainingPlanId={trainingPlan.id}/> {/* TODO - replace id here with .plan */}
                </div>
            </div>
            <div className="plan-item">{trainingPlan.plan_human}</div>
            <div className="plan-item">{trainingPlan.description}</div>
            <div className="plan-item">{trainingPlan.prerequisites}</div>
            {show === true ?
                <div className="plan-item full">
                    <Workouts
                        workouts={workoutDetails} // .workouts was removed here --> turning this into lists
                        onToggle={false}/>
                </div>
            : <></>}
        </>
    )
}

export default Plan;