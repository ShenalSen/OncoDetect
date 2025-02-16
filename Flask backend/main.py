from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
from requests_oauthlib import OAuth2Session
import os

app=Flask(__name__)
app.secret_key=os.urandom(24)


#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'supersecretkey'

db=SQLAlchemy(app)
bcrypt=Bcrypt(app)
jwt=JWTManager(app)
login_manager=LoginManager(app)

#Google oAuth
GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET = "YOUR_GOOGLE_CLIENT_SECRET"
GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"
REDIRECT_URI = "http://127.0.0.1:5000/google/callback"


#User model
class User(db.Model,UserMixin):
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(100),unique=True,nullable=False)
    password=db.Column(db.String(256),nullable=True)
    email=db.Column(db.String(120),unique=True,nullable=False)
    google_id = db.Column(db.String(256), unique=True, nullable=True)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


#database table
with app.app_context():
    db.create_all()



# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login successful', 'token': access_token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
    

#User registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    print(f"Received data: {data}")  # Print received data

    if User.query.filter_by(email=email).first():
        print("User already exists")
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, username=username, password=hashed_password)

    print(f"Creating user: {email}, {username}")  # Print user creation info

    db.session.add(new_user)
    db.session.commit()

    print("User added to the database")
    
    return jsonify({'message': 'User registered successfully'}), 201
    
if  __name__=="__main__":
     app.run(debug=True, host='0.0.0.0', port=5000)   