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


function App() {
  const [name, setName] = useState("");
  const [currentWeek, setCurrentWeek] = useState("");
  const [totalWeeks, setTotalWeeks] = useState("");
  const [distance, setDistance] = useState("");
  const [goal, setGoal] = useState("");
  // TODO rename workoutInstrctions to planProgress (?)
  const [workoutInstructions, setWorkoutInstructions] = useState([])

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

const onPlanSelect = async (planName, goal) => {
    // TODO - clean up this function, e.g. var names
     // TODO - reintroduce + planName)
    const res_1 = await fetch("/workouts/5k-level-1")
    var chosenWorkout = await res_1.json()
    
    const res = await fetch(`/current-plan`, {
        method:"PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(chosenWorkout)
      })

      // Point of this data and state update? Refactor
      const data = await res.json()
      setWorkoutInstructions(goal_data)

      // Update the user's goals
      const goal_res = await fetch("http://localhost:3000/user-plan-info/");
      const goal_data = await goal_res.json();
      console.log(goal_data);

      goal_data["goal"] = goal
      // Add updates here for distance, weeks elapsed etc.

      // goal_put_res is never used - is it needed?
      const goal_put_res = await fetch("http://localhost:3000/user-plan-info/", {
        method:"PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(goal_data)
        })

    }

  return (
    <BrowserRouter>
    <div>
      <Navigation />
      <div className="below-nav-container">
        <Routes>
          <Route path="/choose-plan" element={<Plans workoutInstructions={workoutInstructions} onPlanSelect={onPlanSelect} />}/>
          <Route path="/configure-heart-rate" element={<ConfigureHeartRate />}/>
          <Route path="/" element={
            <>
              <StatusMsg 
                name = {name}
                currentWeek = {currentWeek}
                totalWeeks = {totalWeeks}
                distance = {distance}
                goal = {goal} />
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