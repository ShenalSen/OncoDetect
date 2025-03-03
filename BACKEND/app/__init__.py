from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_cors import CORS
from config import Config
import os

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for the frontend origin
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    login_manager.init_app(app)

    # Ensure the upload folder exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    # Import and register the blueprint for routes
    from app.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    with app.app_context():
        db.create_all()

    # Global token blacklist stored in app config
    app.config['BLACKLIST'] = set()

    # JWT token revocation callback
    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        return jti in app.config.get('BLACKLIST', set())

    return app
