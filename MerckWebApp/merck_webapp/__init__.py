
import boto3
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from config import S3_KEY, S3_SECRET

#create connection to the SQL database
# conn = "mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(
#     'USERNAME', 'PASSWORD', 'NAME OF DATABASE', 'PORT NUMBER', 'TABLE NAME')

#initialize Flask application
app = Flask(__name__)
# app.config['SECRET_KEY'] = 'SECRET KEY' #secret key is used to keep the client-side sessions secure, generated randomly 
app.config['SQLALCHEMY_DATABASE_URI'] = conn #configure the SQLAlchemy database connection to specified db
db = SQLAlchemy(app) #initialize SQLAlchemy as part of the Flask application

#initialize Bcrypt as part of the Flask application
bcrypt = Bcrypt(app)

#initilize LoginManager as part of the Flask application
login_manager = LoginManager(app)
login_manager.login_view = 'login' #when a user attempts to acces a login_required view without logging in, redirect to 'login' route

#set up access to s3 db
s3_resource = boto3.resource(
    "s3",
    aws_access_key_id=S3_KEY,
   aws_secret_access_key=S3_SECRET
)

from merck_webapp import routes
