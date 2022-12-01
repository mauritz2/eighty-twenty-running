import { useState, useEffect } from "react"
import Navigation from "./components/general/Navigation"
import StatusMsg from "./components/current-plan-screen/StatusMsg";
import Weeks from "./components/current-plan-screen/Weeks"
import TrainingPlans from "./components/select-plan-screen/TrainingPlans"
import ConfigureHeartRate from "./components/heart-rate-zone-screen/ConfigureHeartRate";
import { BrowserRouter, Route, Routes } from "react-router-dom"

// MUST HAVE
// Layout design that works on mobile (e.g. drop-downs?)
// Real data for a training plan
// Deploy 
// Review TODOs in code
// Fix CSS on Plan Select
// Add in Icons for all workouts

// Speed Play
// Hill Repetition
// Recovery
// Race
// Long Run
// Fast Finish
// Long Interval
// Short Interval
// 

// NICE TO HAVE
// Add in a total minutes run completion % (?) Or week % completion?
// App redirect on plan select - or some type of flash message "Plan selected"
// Add in some highlight for what week you're currently on?
// Add in some highlight for recovery weeks?
// Add in "or cross-training" flag for workouts

function App() {
  const [currentWeek, setCurrentWeek] = useState("");
  const [goal, setGoal] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  // TODO rename workoutInstrctions to planProgress (?)
  const [workoutInstructions, setWorkoutInstructions] = useState([])
  const [lactateThreshold, setLactateThreshold] = useState(0)

  const setWelcomeMsgState = async () => {
    const res = await fetch("/selected-plan-metadata");
    const data = await res.json();
    setSelectedPlan(data["plan_id"]);
    setCurrentWeek(data["current_week_num"]);
    setGoal(data["goal"]);
  } 

  const getPlanMetaData = async () => {
    const data = await fetch("/selected-plan-metadata");
    const dataJSON = await data.json();
    return dataJSON;
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
      setWorkoutInstructions(workouts);
    });

  getPlanMetaData().then((result) => {
      // TODO - is this redundant since we have onLactateThresholdSubmit
      result = result["lactate_threshold"]
      setLactateThreshold(result);
    });
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
    setWorkoutInstructions(data);
   }

  // TODO - refactor this so we don't have to call this as a func
  setWelcomeMsgState();

const onPlanSelect = async (plan_id, goal) => {
    // TODO - planName is sometimes a planID and sometimes a planName. Make consistent.
    // TODO - clean up this function, e.g. var names
    // TODO - reintroduce + planName here - removing 5k-level-1 hard coding)
    // TODO - create more joins on the backend? At the moment front-end does a lot of work to map phases to workouts for instance
    // Get all workouts that belong to the selected plan
    const res_1 = await fetch("/workouts/" + plan_id);
    var chosenWorkout = await res_1.json();
    
    // Set the selected plan to the current plan
    const res = await fetch(`/current-plan`, {
        method:"PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(chosenWorkout)
      })

      // Refresh the state after updating the database to cause component refresh
      const data = await res.json()
      setWorkoutInstructions(data)

      // Get the user's current plan goal
      const metadata_res = await fetch("/selected-plan-metadata");
      const metadata = await metadata_res.json();

      // Update the object with the user's newly selected goal
      metadata["goal"] = goal;
      metadata["plan_id"] = plan_id;
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
          <Route path="/choose-plan" element={<TrainingPlans workoutInstructions={workoutInstructions} onPlanSelect={onPlanSelect} />}/>
          <Route path="/configure-heart-rate" element={<ConfigureHeartRate lactateThreshold={lactateThreshold} onLactateThresholdSubmit={onLactateThresholdSubmit} />}/>
          <Route path="/" element={
            <>
              <StatusMsg
                planName = {selectedPlan}
                currentWeek = {currentWeek}
                goal = {goal} />
              <Weeks
              workouts={workoutInstructions}
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