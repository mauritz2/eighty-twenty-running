def deploy():
    # Copied this file from a tutorial - it's odd, e.g. we never use Articles or init. TODO - refactor.
    from api import create_app, db
    from flask_migrate import upgrade, migrate, init, stamp
    from models import Articles

    app = create_app()
    app.app_context().push()

    db.create_all()

    # migrate db to latest revision
    #stamp()
    #migrate()
    #upgrade()

deploy()