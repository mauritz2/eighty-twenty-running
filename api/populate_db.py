import os
from data_to_populate import current_plan, workout_phases, training_plan_info, workouts
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from models import CurrentPlan, WorkoutPhases, TrainingPlanInfo, Workouts

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

app.app_context().push()

db = SQLAlchemy(app)

def update_current_plan(data):
    workouts = []
    for workout in data["current_plan"]:
        title = workout["title"]
        new_entry = CurrentPlan(title=title)
        workouts.append(new_entry)
    db.session.add_all(workouts)
    db.session.commit()

def update_workout_phases(data):
    workout_phases = []
    for phase_obj in data["workout_phases"]:
        title = phase_obj["title"]
        for phase in phase_obj["phases"]:
            new_entry =  WorkoutPhases(title=title, phase=phase)
            workout_phases.append(new_entry)
    db.session.add_all(workout_phases)
    db.session.commit()

def update_training_plan_info(data):
    training_plan_info = []
    for training_plan in data["training-plans"]:
        plan = training_plan["plan"]
        plan_human = training_plan["plan_human"]
        description = training_plan["description"]
        prerequisites = training_plan["prerequisites"]
        new_entry = TrainingPlanInfo(plan=plan, plan_human=plan_human, description=description, prerequisites=prerequisites)
        training_plan_info.append(new_entry)
    db.session.add_all(training_plan_info)
    db.session.commit()

def update_workouts(data):
    workouts = []
    for workout in data["workout-plans"]:
        plan = workout["plan"]
        for workout_title in workout["workouts"]:
            title = workout_title["title"]
            new_entry = Workouts(plan=plan, title=title)
            workouts.append(new_entry)
    db.session.add_all(workouts)
    db.session.commit()

if __name__ == "__main__":
    # How to run this script
    # In console, navigate to folder containing this script
    # >> python
    # >> from populate_db import *
    # >> the_func_to_call(the_data_to_call_func_with)
    app.run(debug=True)
