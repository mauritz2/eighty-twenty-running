import { useState, useEffect } from "react"
import Navigation from "./components/Navigation"
import StatusMsg from "./components/StatusMsg";
import Workouts from "./components/Workouts"


function App() {

  const [name, setName] = useState("");
  const [currentWeek, setCurrentWeek] = useState("");
  const [totalWeeks, setTotalWeeks] = useState("");
  const [distance, setDistance] = useState("");
  const [goal, setGoal] = useState("");
  const [workoutInstructions, setWorkoutInstructions] = useState("")

  const setWelcomeMsgState = async () => {
    const res = await fetch("http://localhost:3000/training-plans");
    const data = await res.json();
    setName(data["name"]);
    setCurrentWeek(data["current_week"]);
    setTotalWeeks(data["total_weeks"]);
    setDistance(data["distance"]);
    setGoal(data["goal"]);
  }


  useEffect(() => {
    fetch("http://localhost:3000/5k-level-1")
    .then((response) => response.json())
    .then((workouts) => {
      setWorkoutInstructions(workouts);
    });
  }, []);
  
  setWelcomeMsgState();

  return (
    <div>
      <Navigation />
      <StatusMsg 
      name = {name}
      currentWeek = {currentWeek}
      totalWeeks = {totalWeeks}
      distance = {distance}
      goal = {goal} />
      <small><i>Double-click on workouts to mark them as complete</i></small>
      <Workouts workouts={workoutInstructions}/>
    </div>
  );
}

export default App;


/*   const get_wrks = fetch("http://localhost:3000/5k-level-1").then((response) => response.json()).then((wkrs) => {
    return wkrs;
  });

  useEffect(() => {
    get_wrks.then((data) => {
      setWorkoutInstructions(data);
      console.log(workoutInstructions);
    });
  }, []); */

