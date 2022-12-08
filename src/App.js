import { useState, useEffect } from "react"
import Navigation from "./components/general/Navigation"
import StatusMsg from "./components/current-plan-screen/StatusMsg";
import Weeks from "./components/current-plan-screen/Weeks"
import TrainingPlans from "./components/select-plan-screen/TrainingPlans"
import ConfigureHeartRate from "./components/heart-rate-zone-screen/ConfigureHeartRate";
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  const [currentWeek, setCurrentWeek] = useState("");
  const [goal, setGoal] = useState("");
  const [lactateThreshold, setLactateThreshold] = useState(0);
  const [selectedPlanName, setSelectedPlanName] = useState("");
  const [selectedPlanWorkouts, setSelectedPlanWorkouts] = useState([]);

  /* State-setting functions */

  const setSelectedPlanMetadataState = async () => {
    // Set the plan status information for the StatusMsg component
    fetch("/api/selected-plan-metadata")
    .then((response) => response.json())
    .then((metadata) => {
      setSelectedPlanName(metadata["plan_human"]);
      setCurrentWeek(metadata["current_week_num"]);
      setGoal(metadata["goal"]);
      // Set the lactate threshold state for the ConfigureHeartRate component
      setLactateThreshold(metadata["lactate_threshold"]);
    });
  }

  const setSelectedPlanWorkoutsState = async () => {
    // Set the workouts part of the currently selected plan
    fetch("/api/current-plan")
    .then((response) => response.json())
    .then((workoutData) => {
      setSelectedPlanWorkouts(workoutData);
    });
  }

  useEffect(() => {
    setSelectedPlanWorkoutsState();
    setSelectedPlanMetadataState();
  }, []);

  /* On-click and on-submit functions */

  const onLactateThresholdSubmit = async (newLactateThreshold) => {
    // Update the lactate threshold in the backend and update the state    
    const curRes = await fetch(`/api/selected-plan-metadata`);
    const curData = await curRes.json();

    let newData = curData;
    newData["lactate_threshold"] = newLactateThreshold;

    const updatedRes = await fetch(`/api/selected-plan-metadata`, {
      method:"PUT",
      headers: {
        "Content-type": "application/json"
      },
        body: JSON.stringify(newData)
      });
      
    const updatedData = await updatedRes.json();
    const updatedLactateThreshold = updatedData["lactate_threshold"];
    setLactateThreshold(updatedLactateThreshold);
  }

  const toggleWorkoutCompletion = async(workout_id) => {
    // Toggle a workout as complete on the backend after user marks it as complete    
    const curRes = await fetch(`/api/current-plan`);
    const curData = await curRes.json();

    for (const [index, workout] of Object.entries(curData))
    {
      // Find the workout card that was clicked and toggle it's completion bool
      if(workout.id == workout_id)
      {
        curData[index].complete = !curData[index].complete;
      }
    }

    const res = await fetch(`/api/current-plan`, {
      method:"PUT",
      headers: {
        "Content-type": "application/json"
      },
        body: JSON.stringify(curData)
      });
      
      var data = await res.json();
      setSelectedPlanWorkouts(data);
   }

const onPlanSelect = async (planID, goal) => {
    // Update the selected plan and associated metadata based on user selection
    // Set the new plan as the selected plan
    const workoutRes = await fetch("/api/workouts/" + planID);
    var workoutData = await workoutRes.json();

    const res = await fetch(`/api/current-plan`, {
        method:"PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(workoutData)
      });

      const data = await res.json();
      setSelectedPlanWorkouts(data);

      // Update the plan metadata 
      const metadata_res = await fetch("/api/selected-plan-metadata");
      const metadata = await metadata_res.json();
      metadata["goal"] = goal;
      metadata["plan_id"] = planID;

      fetch("/api/selected-plan-metadata", {
        method:"PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(metadata)
        });
    }

  return (
    <BrowserRouter>
    <div>
      <Navigation />
      <div className="below-nav-container">
        <Routes>
          <Route path="/choose-plan" element={<TrainingPlans selectedPlanWorkouts={selectedPlanWorkouts} onPlanSelect={onPlanSelect} />}/>
          <Route path="/configure-heart-rate" element={<ConfigureHeartRate lactateThreshold={lactateThreshold} onLactateThresholdSubmit={onLactateThresholdSubmit} />}/>
          <Route path="/" element={
            <>
              <StatusMsg
                planName={selectedPlanName}
                currentWeek={currentWeek}
                goal={goal}/>
              <Weeks
                workouts={selectedPlanWorkouts}
                onToggle={toggleWorkoutCompletion}
                autoOpen={true}
                currentWeek={currentWeek}/>
            </>}/>
        </Routes>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;