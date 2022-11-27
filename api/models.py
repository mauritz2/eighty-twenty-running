from api import db, ma
from datetime import datetime

# Current Plan
class CurrentPlan(db.Model):
    # TODO - this can probably be refactored to remove the title. Instead it can just have a PK and get its name from workout-plans
    # TODO - rename to SelectedWorkouts
    # If this is ever made into a public app - need to have a col for user
    # Just making this for myself so current plan will always just have a single plan
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    complete = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, title):
        self.title = title
    
class CurrentPlanSchema(ma.Schema):
    class Meta:
        # The fields to expose
        fields = ("id", "title", "complete")

# Workout Phases
class WorkoutPhases(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    phase = db.Column(db.Text, nullable=False)

    def __init__(self, title, phase):
        self.title = title
        self.phase = phase


class WorkoutPhasesSchema(ma.Schema):
    class Meta:
        fields = ("id", "title", "phase")

class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime(), default=datetime.utcnow)

    def __init__(self, title, body):
        self.title = title
        self.body = body

    def __repr__(self):
        return f"<Articles {self.title}>"
    
class ArticlesSchema(ma.Schema):
    class Meta:
        # The fields to expose
        fields = ("id", "title", "body", "date")

# Serializes a single article
article_schema = ArticlesSchema()

# Serializes a queryset
articles_schema = ArticlesSchema(many=True)
currentplan_schema = CurrentPlanSchema(many=True)
workoutphases_schema = WorkoutPhasesSchema(many=True)
