import { useState, useEffect } from "react"
import Navigation from "./components/Navigation"
import StatusMsg from "./components/StatusMsg";
import Workouts from "./components/Workouts"
import Plans from "./components/Plans"
import { BrowserRouter, Route, Routes } from "react-router-dom"


function App() {

  const [name, setName] = useState("");
  const [currentWeek, setCurrentWeek] = useState("");
  const [totalWeeks, setTotalWeeks] = useState("");
  const [distance, setDistance] = useState("");
  const [goal, setGoal] = useState("");
  const [workoutInstructions, setWorkoutInstructions] = useState([])

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
    fetch("http://localhost:3000/current-plan/1")
    .then((response) => response.json())
    .then((workouts) => {
      setWorkoutInstructions(workouts["workouts"]);
    });
  }, []);
  
  const fetchWorkout = async (id) => {
    const res = await fetch(`http://localhost:3000/current-plan/1`)
    const data = await res.json()

    console.log("Workout by ID")
    console.log(data)


    return data
  }

  const toggleCompletion = async(id) => {
    const workoutToToggle = await fetchWorkout(id);
    const updWorkout = { ...workoutToToggle, complete: !workoutToToggle.complete}
 
    const res = await fetch(`http://localhost:3000/current-plan/1`, {
      method:"PUT",
      headers: {
        "Content-type": "application/json"
      },
        body: JSON.stringify(updWorkout)
      })
      
    var data = await res.json();
    data = data["workouts"]
    
    setWorkoutInstructions(workoutInstructions.map((workout) => workout.id === id ?
    { ...workout, complete: data.complete } : workout))
  }

  setWelcomeMsgState();

const onPlanSelect = async (id) => {
    const res_1 = await fetch(`http://localhost:3000/workout-plans/` + id)
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

    }

  return (
    <BrowserRouter>
    <div>
      <Navigation />
      <div className="below-nav-container">
        <Routes>
          <Route path="/choose-plan" element={<Plans workoutInstructions={workoutInstructions} onPlanSelect={onPlanSelect} />}/>
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