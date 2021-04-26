from flask import Flask
from flask_sqlalchemy import SQLAlchemy

conn = "mysql+pymysql://{0}:{1}@{2}/{3}".format('root', 'root', 'localhost', 'merck_data')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'd44a484a0ea16f23abc4f384641e103e'
app.config['SQLALCHEMY_DATABASE_URI'] = conn
db = SQLAlchemy(app)

from merck_webapp import routes