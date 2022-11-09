import React, { useState } from "react"
import Button from "./Button"
import Workouts from "./Workouts"

const Plan = ({trainingPlan, workoutInstructions}) => {

    const [show, setShow] = useState(false);

    const onViewClick = (id) => {
        // id intentionally not used - it's used for other button funcs
        setShow(!show);
    }

    const fetchWorkouts = async (id) => {
        // TODO - refactor: this is a 100% copy of a function in App.js
        const res = await fetch(`http://localhost:3000/workout-plans/${id}`)
        const data = await res.json()
        return data
      }

    const onPlanChoice = async (id) => {
        console.log("You choose plan" + id);
        const chosenWorkout = await fetchWorkouts(id);
        const res = await fetch(`http://localhost:3000/current-plan/1`, {
            method:"PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(chosenWorkout)
          })
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
                        onClick={onPlanChoice}
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