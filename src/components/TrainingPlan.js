import React, { useState, useEffect } from "react"
import Button from "./Button"
import Workouts from "./WorkoutCards"

const Plan = ({trainingPlan, onPlanClick}) => {
    // TODO - add in plan amount of weeks 
    // TODO - rename trainingPlan to consistent naming
    const [show, setShow] = useState(false);
    const [workoutDetails, setWorkoutDetails] = useState([]);

    const onViewClick = (id) => {
        // id intentionally not used - it's used for other button funcs
        setShow(!show);
    }

    useEffect(() => {
        fetch("/workouts/" + trainingPlan.plan) // TODO - bring this back: + trainingPlan.id)
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
                        color={show ? "#ADA296" : "#88A2AA"}
                        onClick={onViewClick}/>
                </div>
                <div className="plan-item">
                    <Button
                        text="Select Plan"
                        color="#88A2AA"
                        onClick={onPlanClick}
                        trainingPlanId={trainingPlan.plan}/>
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