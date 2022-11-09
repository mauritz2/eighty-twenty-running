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
    console.log("Fetching workous with id " + id)
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

const onPlanSelect = async (id) => {
    console.log("You choose plan" + id);

    const res_1 = await fetch(`http://localhost:3000/workout-plans/${id}`)
    var chosenWorkout = await res_1.json()
    chosenWorkout = chosenWorkout["workouts"]
    
    console.log("Chosen workout")
    console.log(chosenWorkout["workout"])

    await fetch(`http://localhost:3000/current-plan`, {
        method:"DELETE",
        headers: {
            "Content-type": "application/json"
        },
      })

    const res = await fetch(`http://localhost:3000/current-plan`, {
        method:"POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(chosenWorkout)
      })

      const data = await res.json()
      setWorkoutInstructions([...workoutInstructions, data])

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