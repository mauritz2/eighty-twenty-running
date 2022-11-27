from api import create_app
from models import Articles, CurrentPlan, WorkoutPhases
from models import articles_schema, currentplan_schema, workoutphases_schema
from flask import jsonify

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
    selected_phase = WorkoutPhases.query.filter_by(title=title)
    return workoutphases_schema.dump(selected_phase)

if __name__ == "__main__":
    app.run(debug=True)