from merck_webapp import db, login_manager
from sqlalchemy.ext.hybrid import hybrid_property #I don't think we ended up using this since we chose to not use Firebase, but keeping it in case something breaks
from flask_login import UserMixin #this is needed to log users in

#required by login_manager in order to load user
@login_manager.user_loader
def load_user(user_id):
    return users.query.get(int(user_id))

#SQLAlchemy models inherit from SQLAlchemy instance Model
#Each class here represents a table in the database
#They consist of db.Column variables for each column in the table
#The parameters should be the same as parameters used in db creation in SQL, but not absolutely necessary

class patient(db.Model):
    patient_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), unique=False, nullable=False)
    last_name = db.Column(db.String(20), unique=False, nullable=False)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    gender = db.Column(db.String(1), unique=False, nullable=False)
    date_of_birth = db.Column(db.Date(), unique=False, nullable=False)
    height_cm = db.Column(db.Integer, unique=False, nullable=False)
    purpose = db.Column(db.String(50), unique=False, nullable=False)
    image = db.Column(db.String(255), unique=False, nullable=False)

    #Test print
    def __repr__(self):
        return f"Patient('{self.first_name}', '{self.last_name}', '{self.username}',"


class study_specific_data(db.Model):
    patient_id = db.Column(db.Integer, db.ForeignKey(
        'patient.patient_id'), primary_key=True)
    username = db.Column(db.String(20), unique=False, nullable=False)
    input_date = db.Column(db.Date(), unique=False, nullable=False, primary_key=True)
    family_history = db.Column(db.String(255), unique=False, nullable=True)
    diagnostic_notes = db.Column(db.String(255), unique=False, nullable=True)


class users(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))


class phone_app_data(db.Model):
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), primary_key=True)
    input_date = db.Column(db.Date(), unique=False, nullable=False, primary_key=True)
    happiness = db.Column(db.Integer, unique=False, nullable=False)
    sleep = db.Column(db.Integer, unique=False, nullable=False)
    hours_worked = db.Column(db.Integer, unique=False, nullable=False)
    unusual_symptoms = db.Column(db.String(255), unique=False, nullable=True)
    meals = db.Column(db.Integer, unique=False, nullable=False)
    medication_timing = db.Column(db.String(100), unique=False, nullable=True)
    smoking_alcohol = db.Column(db.String(20), unique=False, nullable=True)
    other_medication = db.Column(db.String(100), unique=False, nullable=True)
    water_intake = db.Column(db.Float, unique=False, nullable=False)
    smoking_alcohol = db.Column(db.String(20), unique=False, nullable=True)
    diagnosis = db.Column(db.String(20), unique=False, nullable=True)
    image = db.Column(db.String(255), unique=False, nullable=False)


class fitbit_data(db.Model):
    collection_date = db.Column(db.Date(), unique=True, nullable=False, primary_key=True)
    fbusername = db.Column(db.String(255), unique=False, nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'))
    steps = db.Column(db.Integer, unique=False, nullable=True)
    floors_climbed = db.Column(db.Integer, unique=False, nullable=True)
    total_miles = db.Column(db.Float, unique=False, nullable=True)
    average_resting_hr = db.Column(db.Float, unique=False, nullable=True)
    minutes_asleep = db.Column(db.Integer, unique=False, nullable=True)
    weight = db.Column(db.Float, unique=False, nullable=True)
