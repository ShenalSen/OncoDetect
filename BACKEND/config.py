import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.urandom(24)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'users.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'supersecretkey'
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access']
    UPLOAD_FOLDER = os.path.join(basedir, 'upload_files')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'dcm', 'tif'}
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB limit
