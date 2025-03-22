import os
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from datetime import timedelta

# Initialize extensions
bcrypt = Bcrypt()
jwt = JWTManager()

# Global token blacklist
blacklist = set()

# Config class for easier access to configuration settings
class Config:
    # Secret Key for session management
    SECRET_KEY = os.urandom(24)
    
    # MongoDB configuration
    MONGO_URI = 'mongodb://localhost:27017/'
    DB_NAME = 'OncoDetect'
    
    # JWT configuration
    JWT_SECRET_KEY = os.urandom(24)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    # Upload setup
    UPLOAD_FOLDER = 'upload_files'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'dcm', 'tif'}
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # Limit to 16 MB

def configure_app(app):
    # Apply configuration from Config class
    app.secret_key = Config.SECRET_KEY
    
    # MongoDB configuration
    app.config['MONGO_URI'] = Config.MONGO_URI
    mongo = MongoClient(app.config['MONGO_URI'])
    db = mongo[Config.DB_NAME]
    
    # JWT configuration
    app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = Config.JWT_ACCESS_TOKEN_EXPIRES
    
    # Upload setup
    app.config['UPLOAD_FOLDER'] = Config.UPLOAD_FOLDER
    app.config['ALLOWED_EXTENSIONS'] = Config.ALLOWED_EXTENSIONS
    app.config['MAX_CONTENT_LENGTH'] = Config.MAX_CONTENT_LENGTH
    
    # Initialize extensions with app
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    # Attach db to app context for easy access
    app.mongo = mongo
    app.db = db
    
    # Token revocation callback
    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        jti = jwt_payload["jti"]
        return jti in blacklist

    return app