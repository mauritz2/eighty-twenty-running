import React, { useState, useEffect } from "react"
import Button from "./Button"
import Workouts from "./WorkoutCards"

const Plan = ({trainingPlan, onPlanClick}) => {
    // TODO - rename Plan to TrainingPlan above
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
                <div>
                    <Button
                        text="Select Plan"
                        buttonColor="#000"
                        onClick={onPlanClick}
                        trainingPlanId={trainingPlan.plan}
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
                        onToggle={false}/>
                </div>
            : <></>}
            <div className="divider full"></div>

        </>
    )
}

export default Plan;