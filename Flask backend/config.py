import os

class Config:
    # Secret key for session management
    SECRET_KEY = os.urandom(24)

    # Database setup
    SQLALCHEMY_DATABASE_URI = 'sqlite:///users.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT setup
    JWT_SECRET_KEY = 'supersecretkey'
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ["access"]

    # Upload setup
    UPLOAD_FOLDER = 'upload_files'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'dcm', 'tif'}
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # Limit to 16 MB
