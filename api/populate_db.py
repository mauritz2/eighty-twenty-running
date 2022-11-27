import os
from data_to_populate import current_plan, workout_phases
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from models import CurrentPlan, WorkoutPhases

basedir = os.path.abspath(os.path.dirname(__file__))


app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

app.app_context().push()

db = SQLAlchemy(app)

def update_current_plan(data):
    workouts = []
    for workout in data["data"]:
        print(workout["title"])
        title = workout["title"]
        new_entry = CurrentPlan(title=title)
        workouts.append(new_entry)
    db.session.add_all(workouts)
    db.session.commit()

def update_workout_phases(data):
    workout_phases = []
    for phase_obj in data["workout_phases"]:
        title = phase_obj["title"]
        print(title)
        for phase in phase_obj["phases"]:
            new_entry =  WorkoutPhases(title=title, phase=phase)
            workout_phases.append(new_entry)
    db.session.add_all(workout_phases)
    db.session.commit()


if __name__ == "__main__":
    app.run(debug=True)
