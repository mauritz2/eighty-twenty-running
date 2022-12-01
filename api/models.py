from app_setup import db, ma
from datetime import datetime

# Current Plan
class CurrentPlan(db.Model):
    # Table containing the workout details for the user's currently selected plan
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    complete = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, title, complete=False):
        self.title = title
        self.complete = complete
    
class CurrentPlanSchema(ma.Schema):
    class Meta:
        fields = ("id", "title", "complete")

# Workout Phases
class WorkoutPhases(db.Model):
    # Table containing detailed workout instructions, i.e. how long to run for in each zone
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
    # Table containing high-level training plan data
    id = db.Column(db.Integer, primary_key=True)
    plan_id = db.Column(db.Text, nullable=False)
    plan_human = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    prerequisites = db.Column(db.Text, nullable=False)

    def __init__(self, plan_id, plan_human, description, prerequisites):
        self.plan_id = plan_id
        self.plan_human = plan_human
        self.description = description
        self.prerequisites = prerequisites

class TrainingPlanInfoSchema(ma.Schema):
    class Meta:
        fields = ("id", "plan_id", "plan_human", "description", "prerequisites")

# Workouts
class Workouts(db.Model):
    # Table containing all plans and their associated workouts
    id = db.Column(db.Integer, primary_key=True)
    plan_id = db.Column(db.Text, nullable=False)
    title = db.Column(db.Text, nullable=False)

    def __init__(self, plan_id, title):
        self.plan_id = plan_id
        self.title = title

class WorkoutsSchema(ma.Schema):
    class Meta:
        fields = ("id", "plan_id", "title")

# Selected Plan Metadata
class SelectedPlanMetadata(db.Model):
    # Table containing metadata for the user's currently selected plan, e.g. plan goal
    id = db.Column(db.Integer, primary_key=True)
    plan_id = db.Column(db.Text, nullable=False)
    goal = db.Column(db.Text, nullable=True)
    lactate_threshold = db.Column(db.Integer, default=0) 
    created = db.Column(db.DateTime(), default=datetime.utcnow)
    plan_human = db.Column(db.Text, nullable=False)

    def __init__(self, plan_id, goal, lactate_threshold, plan_human):
        self.plan_id = plan_id
        self.goal = goal
        self.lactate_threshold = lactate_threshold
        self.plan_human = plan_human

class SelectedPlanMetadataSchema(ma.Schema):
    class Meta:
        fields = ("id", "plan_id", "created", "goal", "lactate_threshold", "plan_human")

# Schema instantiation - used to serialize what SQLAlchemy returns into JSON
currentplan_schema = CurrentPlanSchema(many=True)
workoutphases_schema = WorkoutPhasesSchema(many=True)
trainingplaninfo_schema = TrainingPlanInfoSchema(many=True)
workouts_schema = WorkoutsSchema(many=True)
selectedplanmetadata_schema = SelectedPlanMetadataSchema()