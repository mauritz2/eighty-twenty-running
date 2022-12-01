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
  const [selectedPlanName, setSelectedPlanName] = useState("");
  const [currentPlanWorkouts, setCurrentPlanWorkouts] = useState([])
  const [lactateThreshold, setLactateThreshold] = useState(0)

  const setStatusMsg = async () => {
    // Set the plan status information for the StatusMsg component
    const res = await fetch("/selected-plan-metadata");
    const data = await res.json();
    setSelectedPlanName(data["plan_human"]);
    setCurrentWeek(data["current_week_num"]);
    setGoal(data["goal"]);

    // Set the lactate threshold state for the ConfigureHeartRate component
    setLactateThreshold(data["lactate_threshold"])

  } 

  const onLactateThresholdSubmit = async (newLactateThreshold) => {
    
    // TODO - doesn't seem to be a way to reference an external func here. Refactor?
    const curRes = await fetch(`/selected-plan-metadata`)
    const curData = await curRes.json()

    let newData = curData 
    newData["lactate_threshold"] = newLactateThreshold;

    const updatedRes = await fetch(`/selected-plan-metadata`, {
      method:"PUT",
      headers: {
        "Content-type": "application/json"
      },
        body: JSON.stringify(newData)
      })
      
    const updatedData = await updatedRes.json();
    const updatedLactateThreshold = updatedData["lactate_threshold"];
    setLactateThreshold(updatedLactateThreshold);
  }

  useEffect(() => {
    // TODO - refactor to break out separate fetches into separate funcs
    // TODO - instead of getting the current plan we should get the workout plans and
    // then set the current plan to what's defined in user-plan-info
    fetch("/current-plan")
    .then((response) => response.json())
    .then((workouts) => {
      setCurrentPlanWorkouts(workouts);
    });

    setStatusMsg();
  }, []);

  const toggleCompletion = async(id) => {
    // TODO - refactor - there's a data structure on the backend with ID that could be simplified to avoid this...
    const res_2 = await fetch(`/current-plan`)
    const data_2 = await res_2.json()
    const id_index = id - 1

    data_2[id_index].complete = !data_2[id_index].complete 

    const res = await fetch(`/current-plan`, {
      method:"PUT",
      headers: {
        "Content-type": "application/json"
      },
        body: JSON.stringify(data_2)
      })
      
    var data = await res.json();
    setCurrentPlanWorkouts(data);
   }


const onPlanSelect = async (planID, goal) => {
    // TODO - planName is sometimes a planID and sometimes a planName. Make consistent.
    // TODO - clean up this function, e.g. var names
    // TODO - reintroduce + planName here - removing 5k-level-1 hard coding)
    // TODO - create more joins on the backend? At the moment front-end does a lot of work to map phases to workouts for instance
    // Get all workouts that belong to the selected plan
    const res_1 = await fetch("/workouts/" + planID);
    var chosenWorkout = await res_1.json();
    
    // Set the selected plan to the current plan
    const res = await fetch(`/current-plan`, {
        method:"PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(chosenWorkout)
      });

      // Refresh the state after updating the database to cause component refresh
      const data = await res.json()
      setCurrentPlanWorkouts(data)

      // Get the user's current plan goal
      const metadata_res = await fetch("/selected-plan-metadata");
      const metadata = await metadata_res.json();

      // Update the object with the user's newly selected goal
      metadata["goal"] = goal;
      metadata["plan_id"] = planID;
      // Add updates here for distance, weeks elapsed etc.

      // Update the plan metadata with the newly selected goal
      // TODO - goal_put_res needed?

      const goal_put_res = await fetch("/selected-plan-metadata", {
        method:"PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(metadata)
        })
    }

  return (
    <BrowserRouter>
    <div>
      <Navigation />
      <div className="below-nav-container">
        <Routes>
          <Route path="/choose-plan" element={<TrainingPlans currentPlanWorkouts={currentPlanWorkouts} onPlanSelect={onPlanSelect} />}/>
          <Route path="/configure-heart-rate" element={<ConfigureHeartRate lactateThreshold={lactateThreshold} onLactateThresholdSubmit={onLactateThresholdSubmit} />}/>
          <Route path="/" element={
            <>
              <StatusMsg
                planName = {selectedPlanName}
                currentWeek = {currentWeek}
                goal = {goal} />
              <Weeks
              workouts={currentPlanWorkouts}
              onToggle={toggleCompletion}
              defaultOpenWeek={true}
              />

            </>}/>
        </Routes>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;