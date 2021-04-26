from merck_webapp import db

class patient(db.Model):
	patient_id = db.Column(db.Integer, primary_key=True)
	first_name = db.Column(db.String(20), unique=False, nullable=False)
	last_name = db.Column(db.String(20), unique=False, nullable=False)
	username = db.Column(db.String(20), unique=True, nullable=False)
	email = db.Column(db.String(120), unique=True, nullable=False)
	gender = db.Column(db.String(1), unique=False, nullable=False)
	date_of_birth = db.Column(db.Date(), unique=False, nullable=False)
	height_cm = db.Column(db.Integer, unique=False, nullable=False)

	def __repr__(self):
		return f"Patient('{self.first_name}', '{self.last_name}', '{self.username}',"

class study_specific_data(db.Model):
	patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), primary_key=True)
	username = db.Column(db.String(20), unique=True, nullable=False)
	input_date = db.Column(db.Date(), unique=False, nullable=False)
	family_history = db.Column(db.String(255), unique=False, nullable=True)
	diagnostic_notes = db.Column(db.String(255), unique=False, nullable=True)
	
