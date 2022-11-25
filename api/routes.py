from api import create_app
from models import Articles, articles_schema
from flask import jsonify

app = create_app()

@app.route("/articles", methods=["GET"], strict_slashes=False)
def articles():
    articles = Articles.query.all()
    results = articles_schema.dump(articles)

    return jsonify(results)

if __name__ == "__main__":
    app.run()