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
  const [workoutInstructions, setWorkoutInstructions] = useState([])
  const [detailedWorkouts, setDetailedWorkouts] = useState([])

  const setWelcomeMsgState = async () => {
    const res = await fetch("http://localhost:3000/user-plan-info");
    const data = await res.json();
    setName(data["name"]);
    setCurrentWeek(data["current_week"]);
    setTotalWeeks(data["total_weeks"]);
    setDistance(data["distance"]);
    setGoal(data["goal"]);
  } 

  useEffect(() => {
    // TODO - instead of getting the current plan we should get the workout plans and
    // then set the current plan to what's defined in user-plan-info
    fetch("http://localhost:3000/current-plan/1")
    .then((response) => response.json())
    .then((workouts) => {
      setWorkoutInstructions(workouts["workouts"]);
    });

    fetch("http://localhost:3000/workout-plans/")
    .then((response) => response.json())
    .then((detailedWorkouts) => {
      setDetailedWorkouts(detailedWorkouts);
    });

    fetch("/articles").then(res => res.json()).then(data => {
      console.log("My articles below");
      console.log(data);
      console.log(data[0].body);
      console.log(typeof(data));
    });

  }, []);

  const toggleCompletion = async(id) => {
    // TODO - refactor - there's a data structure on the backend with ID that could be simplified to avoid this...
    const res_2 = await fetch(`http://localhost:3000/current-plan/1`)
    const data_2 = await res_2.json()
    const id_index = id - 1

    data_2["workouts"][id_index].complete = !data_2["workouts"][id_index].complete 

    const res = await fetch(`http://localhost:3000/current-plan/1`, {
      method:"PUT",
      headers: {
        "Content-type": "application/json"
      },
        body: JSON.stringify(data_2)
      })
      
    var data = await res.json();
    data = data["workouts"]
    setWorkoutInstructions(data);
   }

  // TODO - refactor this so we don't have to call this as a func
  setWelcomeMsgState();

const onPlanSelect = async (planName, goal) => {
    // TODO - clean up this function, e.g. var names
    const res_1 = await fetch(`http://localhost:3000/workout-plans/` + planName)
    var chosenWorkout = await res_1.json()
    
    const res = await fetch(`http://localhost:3000/current-plan/1`, {
        method:"PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(chosenWorkout)
      })

      const data = await res.json()
      setWorkoutInstructions(data["workouts"])

      // Update the user's goals
      console.log("This is the goal in App.js")
      console.log(goal);

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