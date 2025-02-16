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
Bcrypt=Bcrypt(app)
jwt=JWTManager(app)
login_manager=LoginManager(app)


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




@app.route('/login',methods=['POST'])
def Login():
    data=request.get_json()

    Username=data.get('Username')
    Password=data.get('Password')


    if Username== 'User' and Password=='User123':
        return jsonify({'message':'Login successful'}),200
    else:
        return jsonify({'message':'Login failed'}),401
    
if  __name__=="__main__":
     app.run(debug=True, host='0.0.0.0', port=5000)   