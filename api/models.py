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

    def __init__(self, title, complete=False):
        self.title = title
        self.complete = complete
    
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

# Training Plan Info
class TrainingPlanInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.Text, nullable=False)
    plan_human = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    prerequisites = db.Column(db.Text, nullable=False)

    def __init__(self, plan, plan_human, description, prerequisites):
        self.plan = plan
        self.plan_human = plan_human
        self.description = description
        self.prerequisites = prerequisites


class TrainingPlanInfoSchema(ma.Schema):
    class Meta:
        fields = ("id", "plan", "plan_human", "description", "prerequisites")

# Workouts
class Workouts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    plan = db.Column(db.Text, nullable=False)
    title = db.Column(db.Text, nullable=False)

    def __init__(self, plan, title):
        self.plan = plan
        self.title = title

class WorkoutsSchema(ma.Schema):
    class Meta:
        fields = ("id", "plan", "title")

# Selected Plan Metadata
class SelectedPlanMetadata(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # TODO - make plan into plan_id consistently when we're referencing "5k-level1"
    plan_id = db.Column(db.Text, nullable=False)
    goal = db.Column(db.Text, nullable=True)
    lactate_threshold = db.Column(db.Integer, default=0) 
    created = db.Column(db.DateTime(), default=datetime.utcnow)

    def __init__(self, plan_id, goal, lactate_threshold):
        self.plan_id = plan_id
        self.goal = goal
        self.lactate_threshold = lactate_threshold

class SelectedPlanMetadataSchema(ma.Schema):
    class Meta:
        fields = ("id", "plan_id", "created", "goal", "lactate_threshold")

# Schema instantiation - used for serialization
currentplan_schema = CurrentPlanSchema(many=True)
workoutphases_schema = WorkoutPhasesSchema(many=True)
trainingplaninfo_schema = TrainingPlanInfoSchema(many=True)
workouts_schema = WorkoutsSchema(many=True)
selectedplanmetadata_schema = SelectedPlanMetadataSchema()