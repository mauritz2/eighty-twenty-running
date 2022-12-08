import React, { useState, useEffect } from "react"
import Button from "../general/Button"
import Workouts from "../current-plan-screen/Weeks"

const TrainingPlan = ({trainingPlan, onPlanClick}) => {
    // Owns what to show for a specific training plan when the user browses new plans to potentially select
    const [show, setShow] = useState(false);
    const [workoutDetails, setWorkoutDetails] = useState([]);

    const onViewClick = (id) => {
        // Show the detailed workouts related to the training plan
        // id intentionally not used - it's used for other button funcs
        setShow(!show);
    }

    useEffect(() => {
        // Get the workouts related to the training plan so user can see plan before choosing
        fetch("/api/workouts/" + trainingPlan.plan_id)
        .then((res) => res.json())
        .then((data) => {
            setWorkoutDetails(data);
        });
    }, []);

    return(
        <>
            <div>
                <div>
                    <Button
                        text="Select Plan"
                        buttonColor="#000"
                        onClick={onPlanClick}
                        trainingPlanId={trainingPlan.plan_id}
                        textColor="#fff"/>
                </div>
                <div>
                    <Button
                        text={show ? "Hide Plan" : "View Plan"}
                        buttonColor={show ? "#fff" : "#fff"}
                        onClick={onViewClick}/>
                </div>
            </div>
            <div className="plan-item"><strong>{trainingPlan.plan_human}</strong></div>
            <div className="plan-item">{trainingPlan.description}</div>
            <div className="plan-item">{trainingPlan.prerequisites}
            </div>
            {show === true ?
                <div className="plan-item full">
                    <Workouts
                        workouts={workoutDetails}
                        onToggle={false}
                        defaultOpenWeek={false}/>
                </div>
            : <></>}
            <div className="divider full"></div>

        </>
    );
}

export default TrainingPlan;