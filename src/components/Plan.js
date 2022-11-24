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
        fetch("http://localhost:3000/workout-plans/" + trainingPlan.id)
        .then((res) => res.json())
        .then((data) => {
            setWorkoutDetails(data);
            console.log(workoutDetails);
        })
    });

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
                        workouts={workoutDetails.workouts}
                        onToggle={false}/>
                </div>
            : <></>}
        </>
    )
}

export default Plan;