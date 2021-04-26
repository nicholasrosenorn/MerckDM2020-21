from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, SelectField, DateField, TextAreaField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from merck_webapp.models import patient

class PatientInformation(FlaskForm):
	first_name = StringField('First Name', validators=[DataRequired()])
	last_name = StringField('Last Name', validators=[DataRequired()])
	username = StringField('Username', validators=[DataRequired()])
	email = StringField('Email', validators=[DataRequired(), Email()])
	gender = SelectField('Gender', choices=['M', 'F', 'O'])
	date_of_birth = DateField('Date of Birth', format='%Y-%m-%d', validators=[DataRequired()])
	height_cm = StringField('Height (cm)', validators=[DataRequired()])
	submit_patient = SubmitField('Submit New Patient')

	def validate_username(self, username):
		patient_object = patient.query.filter_by(username=username.data)
		if patient_object:
			raise ValidationError("Username already exists.")

class OngoingStudyData(FlaskForm):
	username = StringField('Username', validators=[DataRequired()])
	input_date = DateField('Input Date', validators=[DataRequired()])
	family_history = TextAreaField('Family History')
	diagnostic_notes = TextAreaField('Diagnostic Notes')
	submit_data = SubmitField('Submit Patient Data')
