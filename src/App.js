import { useState, useEffect } from "react"
import Navigation from "./components/Navigation"
import StatusMsg from "./components/StatusMsg";
import Workouts from "./components/Workouts"
import Plans from "./components/Plans"
import ConfigureHeartRate from "./components/ConfigureHeartRate";
import { BrowserRouter, Route, Routes } from "react-router-dom"


// TODO - rename
// Workout --> WorkoutCard
// Workouts --> WorkoutCards
// Plan --> WorkoutPlan
// Plans --> WorkoutPlans

// Add in lactate threshold saving to DB
// Add in toggling of Complete true/false
// Add in a progress bar for plan completeness?
// Add in some highlight for recovery weeks?
// Add in some highlight for what week you're currently on?

function App() {
  const [name, setName] = useState("");
  const [currentWeek, setCurrentWeek] = useState("");
  const [totalWeeks, setTotalWeeks] = useState("");
  const [distance, setDistance] = useState("");
  const [goal, setGoal] = useState("");
  // TODO rename workoutInstrctions to planProgress (?)
  const [workoutInstructions, setWorkoutInstructions] = useState([])
  const [lactateThreshold, setLactateThreshold] = useState(0)

  const setWelcomeMsgState = async () => {
    const res = await fetch("/selected-plan-metadata");
    const data = await res.json();
    setName(data["runner"]);
    setCurrentWeek(data["current_week_num"]);
    setTotalWeeks(data["total_weeks"]);
    setDistance(data["distance_km"]);
    setGoal(data["goal"]);
  } 

  useEffect(() => {
    // TODO - instead of getting the current plan we should get the workout plans and
    // then set the current plan to what's defined in user-plan-info
    fetch("/current-plan")
    .then((response) => response.json())
    .then((workouts) => {
      setWorkoutInstructions(workouts);
    });

    fetch("/selected-plan-metadata")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data["lactate_threshold"]);
      setLactateThreshold(data["lactate_threshold"]);
    });

  }, []);

  const toggleCompletion = async(id) => {
    // TODO - refactor - there's a data structure on the backend with ID that could be simplified to avoid this...
    console.log("I am toggling completion");
    
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

const onPlanSelect = async (planName, goal) => {
    // TODO - planName is sometimes a planID and sometimes a planName. Make consistent.
    // TODO - clean up this function, e.g. var names
    // TODO - reintroduce + planName here - removing 5k-level-1 hard coding)
    // TODO - create more joins on the backend? At the moment front-end does a lot of work to map phases to workouts for instance
    // Get all workouts that belong to the selected plan
    const res_1 = await fetch("/workouts/" + planName);
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
      const goal_res = await fetch("/selected-plan-metadata");
      const goal_data = await goal_res.json();
      console.log(goal_data);

      // Update the object with the user's newly selected goal
      goal_data["goal"] = goal
      // Add updates here for distance, weeks elapsed etc.

      // Update the plan metadata with the newly selected goal
      const goal_put_res = await fetch("/selected-plan-metadata", {
        method:"PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(goal_data)
        })

        
        const updated_goal_data = await goal_put_res.json();
        setGoal(updated_goal_data);

    }

  // Removing status message for now - UI looks less cluttered without it
  /* <StatusMsg 
                name = {name}
                currentWeek = {currentWeek}
                totalWeeks = {totalWeeks}
                distance = {distance}
                goal = {goal} />
  */
  return (
    <BrowserRouter>
    <div>
      <Navigation />
      <div className="below-nav-container">
        <Routes>
          <Route path="/choose-plan" element={<Plans workoutInstructions={workoutInstructions} onPlanSelect={onPlanSelect} />}/>
          <Route path="/configure-heart-rate" element={<ConfigureHeartRate lactateThreshold={lactateThreshold} />}/>
          <Route path="/" element={
            <>
              <Workouts
                workouts={workoutInstructions}
                onToggle={toggleCompletion}/>
            </>}/>
        </Routes>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;