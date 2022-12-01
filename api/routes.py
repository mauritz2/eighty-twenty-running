from app_setup import create_app, db
from models import CurrentPlan, WorkoutPhases, TrainingPlanInfo, Workouts, SelectedPlanMetadata
from models import currentplan_schema, workoutphases_schema, trainingplaninfo_schema, workouts_schema, selectedplanmetadata_schema
from flask import request, jsonify
from datetime import datetime

app = create_app()

@app.route("/current-plan", methods=["GET", "PUT"])
def selected_workouts():
 
    if request.method == "PUT":
        json = request.get_json()

        CurrentPlan.query.delete()
        
        workouts = []
                
        for workout in json:
            title = workout["title"]
            if "complete" in workout:
                complete = workout["complete"]
            else:
                # Handle case when a new plan is selected - default all workouts to False
                complete = False
            new_entry = CurrentPlan(title=title, complete=complete)
            workouts.append(new_entry)
        db.session.add_all(workouts)
        db.session.commit()        
        
    # TODO - rename current-plan to selected-workouts
    # TODO - remove "complete" from the workouts library since it defaults to false when selected as current plan anyways 
    selected_workouts = CurrentPlan.query.all()
    results = currentplan_schema.dump(selected_workouts)

    return jsonify(results)

@app.route("/workout-phases/<title>", methods=["GET"])
def workout_phases(title):
    # TODO - fix the URL format here (currently workout-phases/Foundation%201). Maybe each workout should have its own ID.
    phases = []
    selected_phase = WorkoutPhases.query.filter_by(title=title)
    results = workoutphases_schema.dump(selected_phase)
    for entry in results:
        phases.append(entry["phase"])
    return phases

@app.route("/training-plan-info", methods=["GET"])
def training_plan_info():
    # Current logic only fetches all training plans at once - no need to one URL per training plan info object atm
    selected_training_plan = TrainingPlanInfo.query.all()
    result = trainingplaninfo_schema.dump(selected_training_plan)
    return result

@app.route("/workouts", methods=["GET"])
def workouts_all():
    selected_workouts = Workouts.query.all()
    result = workouts_schema.dump(selected_workouts)
    return result

@app.route("/workouts/<plan_id>", methods=["GET"])
def workouts(plan_id):
    selected_workout = Workouts.query.filter_by(plan_id=plan_id)
    result = workouts_schema.dump(selected_workout)
    return result

@app.route("/selected-plan-metadata", methods=["GET", "PUT"])
def selected_plan_metadata():

    if request.method == "PUT":
        submitted_metadata = request.get_json()
        SelectedPlanMetadata.query.delete()

        print("Submitted metadata \n\n\n")
        print(submitted_metadata)
        print("\n\n\n")

        plan_id = submitted_metadata["plan_id"]
        goal = submitted_metadata["goal"]
        lactate_threshold = submitted_metadata["lactate_threshold"]
        
        plan_details = TrainingPlanInfo.query.filter_by(plan_id=plan_id)
        plan_details = trainingplaninfo_schema.dump(plan_details)

        plan_human = plan_details[0]["plan_human"]

        new_entry = SelectedPlanMetadata(plan_id=plan_id,
            goal=goal,
            lactate_threshold=lactate_threshold,
            plan_human=plan_human)
        db.session.add(new_entry)
        db.session.commit()


    selected_plan_metadata = SelectedPlanMetadata.query.first()
    result = selectedplanmetadata_schema.dump(selected_plan_metadata)

    # Turn created date into the current plan week - eg. "You're on week 3"
    plan_created = datetime.strptime(result["created"], "%Y-%m-%dT%H:%M:%S.%f")
    plan_created_week = plan_created.isocalendar()[1]
    now_week = datetime.utcnow().isocalendar()[1]
    if plan_created_week > now_week:
        # Handle week diff for plan that stretches over two years
        week_diff = 52 - abs(now_week - plan_created_week)
    else:
        # Handle normal case when plan is contained in a single year
        week_diff = now_week - plan_created_week
    # Used to display: "You are currently at week {current_week_num} of your plan"
    current_week_num = week_diff + 1
    # No need to expose the plan created date to the UI
    del result["created"]
    result["current_week_num"] = current_week_num
    
    return result


if __name__ == "__main__":
    app.run(debug=True)