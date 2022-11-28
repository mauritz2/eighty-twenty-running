from api import create_app
from models import Articles, CurrentPlan, WorkoutPhases, TrainingPlanInfo, Workouts, SelectedPlanMetadata
from models import articles_schema, currentplan_schema, workoutphases_schema, trainingplaninfo_schema, workouts_schema, selectedplanmetadata_schema
from flask import jsonify
from datetime import datetime

app = create_app()

@app.route("/articles", methods=["GET"])
def articles():
    articles = Articles.query.all()
    results = articles_schema.dump(articles)

    return jsonify(results)

@app.route("/current-plan", methods=["GET"])
def selected_workouts():
    # TODO - rename current-plan to selected-workouts
    # Would be better to join in "false" to all workouts on select so we don't have to store that flag in workouts where it's not needed
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

@app.route("/workouts/<plan>", methods=["GET"])
def workouts(plan):
    selected_workout = Workouts.query.filter_by(plan=plan)
    result = workouts_schema.dump(selected_workout)
    return result

@app.route("/selected-plan-metadata", methods=["GET"])
def selected_plan_metadata():
    selected_plan_metadata = SelectedPlanMetadata.query.first()
    result = selectedplanmetadata_schema.dump(selected_plan_metadata)

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

    del result["created"]
    result["current_week_num"] = current_week_num
    
    return result


if __name__ == "__main__":
    app.run(debug=True)