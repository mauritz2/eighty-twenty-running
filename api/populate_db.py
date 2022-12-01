import os
from data_to_populate import current_plan, workout_phases, training_plan_info, workouts, selected_plan_metadata
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from models import CurrentPlan, WorkoutPhases, TrainingPlanInfo, Workouts, SelectedPlanMetadata

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
        plan_id = training_plan["plan_id"]
        plan_human = training_plan["plan_human"]
        description = training_plan["description"]
        prerequisites = training_plan["prerequisites"]
        new_entry = TrainingPlanInfo(plan_id=plan_id, plan_human=plan_human, description=description, prerequisites=prerequisites)
        training_plan_info.append(new_entry)
    db.session.add_all(training_plan_info)
    db.session.commit()

def update_workouts(data):
    workouts = []
    for workout in data["workout-plans"]:
        plan_id = workout["plan_id"]
        for workout_title in workout["workouts"]:
            title = workout_title["title"]
            new_entry = Workouts(plan_id=plan_id, title=title)
            workouts.append(new_entry)
    db.session.add_all(workouts)
    db.session.commit()

def update_selected_plan_meta_data(data):
    selected_plan = data["user-plan-info"]

    plan_id = selected_plan["plan_id"]
    plan_human = selected_plan["plan_human"]
    goal = selected_plan["goal"]
    lactate_threshold = selected_plan["lactate_threshold"]
    new_entry = SelectedPlanMetadata(plan_id=plan_id, goal=goal, lactate_threshold=lactate_threshold, plan_human=plan_human)

    db.session.add_all([new_entry])
    db.session.commit()

def update_all():
    update_current_plan(current_plan)
    update_selected_plan_meta_data(selected_plan_metadata)
    update_training_plan_info(training_plan_info)
    update_workout_phases(workout_phases)
    update_workouts(workouts)

if __name__ == "__main__":
    # How to run individual data updates
    # In console, navigate to folder containing this script
    # >> python
    # >> from populate_db import *
    # >> the_func_to_call(the_data_to_call_func_with)
    app.run(debug=True)
