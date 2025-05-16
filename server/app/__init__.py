from flask import Flask
from config import Config
from app.extensions import db, bcrypt, cors, login_manager, migrate
from app.models import User

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    #initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)
    
    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp)
    
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(id)
    
    return app