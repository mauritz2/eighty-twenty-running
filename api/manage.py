def deploy():
    from api import create_app
    from flask_migrate import upgrade, migrate, init, stamp
    from models import db

    app = create_app()
    app.app_context().push()

    db.create_all()

    # TODO - when needed add in migration functionality
    # migrate db to latest revision
    #stamp()
    #migrate()
    #upgrade()

deploy()