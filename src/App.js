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
  const [workoutInstructions, setWorkoutInstructions] = useState("")

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
    fetch("http://localhost:3000/current-plan")
    .then((response) => response.json())
    .then((workouts) => {
      setWorkoutInstructions(workouts);
    });
  }, []);
  
  const fetchWorkouts = async (id) => {
    const res = await fetch(`http://localhost:3000/current-plan/${id}`)
    const data = await res.json()
    return data
  }

  const toggleCompletion = async(id) => {
    const workoutToToggle = await fetchWorkouts(id);
    const updWorkout = { ...workoutToToggle, complete: !workoutToToggle.complete}
 
    const res = await fetch(`http://localhost:3000/current-plan/${id}`, {
      method:"PUT",
      headers: {
        "Content-type": "application/json"
      },
        body: JSON.stringify(updWorkout)
      })
      
    const data = await res.json();
    
    setWorkoutInstructions(workoutInstructions.map((workout) => workout.id === id ?
    { ...workout, complete: data.complete } : workout))
  }

  setWelcomeMsgState();

  console.log(workoutInstructions);
 
  return (
    <BrowserRouter>
    <div>
      <Navigation />
      <div className="below-nav-container">
        <Routes>
          <Route path="/choose-plan" element={<Plans workoutInstructions={workoutInstructions} />}/>
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