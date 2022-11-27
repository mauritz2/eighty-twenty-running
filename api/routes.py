from api import create_app
from models import Articles, CurrentPlan, articles_schema, currentplan_schema
from flask import jsonify

app = create_app()

@app.route("/articles", methods=["GET"], strict_slashes=False)
def articles():
    articles = Articles.query.all()
    results = articles_schema.dump(articles)

    return jsonify(results)

@app.route("/current-plan", methods=["GET"], strict_slashes=False)
def selected_workouts():
    # TODO - rename current-plan to selected-workouts
    selected_workouts = CurrentPlan.query.all()
    results = currentplan_schema.dump(selected_workouts)

    return jsonify(results)

if __name__ == "__main__":
    app.run()