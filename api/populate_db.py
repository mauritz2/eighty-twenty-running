import os
from data_to_populate import current_plan
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from models import CurrentPlan

basedir = os.path.abspath(os.path.dirname(__file__))


app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

app.app_context().push()

db = SQLAlchemy(app)

def update_current_plan_data(current_plan_data):
    workouts = []
    for workout in current_plan_data["current_plan"]:
        print(workout["title"])
        title = workout["title"]
        new_entry = CurrentPlan(title=title)
        workouts.append(new_entry)
        db.session.add_all(workouts)
        db.session.commit()


if __name__ == "__main__":
    app.run(debug=True)
