from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, SelectField, DateField, TextAreaField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from merck_webapp.models import patient, users

# Each form class inherits from FlaskForm and is comprised of Field variables with the name and list of validators passed as parameters

class PatientInformation(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    gender = SelectField('Gender', choices=['M', 'F', 'O'])
    date_of_birth = DateField(
        'Date of Birth', format='%Y-%m-%d', validators=[DataRequired()])
    height_cm = StringField('Height (cm)', validators=[DataRequired()])
    submit_patient = SubmitField('Submit New Patient')

    #custom validation for the username to make sure the username is not taken, is automatically appiled automatically without passing as parameter
    def validate_username(self, username):
        #search for username in input field in the database
        patient_object = patient.query.filter_by(username=username.data)
        if not patient_object:
            raise ValidationError("Username already exists.")


class OngoingStudyData(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    input_date = DateField('Input Date', validators=[DataRequired()])
    family_history = TextAreaField('Family History')
    diagnostic_notes = TextAreaField('Diagnostic Notes')
    submit_data = SubmitField('Submit Patient Data')


class LogIn(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = StringField('Password', validators=[DataRequired()])
    submit_login = SubmitField("Sign In")


class CreateAccount(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = StringField('Password', validators=[DataRequired(), Length(
        min=6, message="Password must be at least %(min)d characters long.")])
    confirm_password = StringField('ConfirmPassword', validators=[DataRequired(), EqualTo('password', message="Passwords must match.")])
    submit_signup = SubmitField("Create Account")

    #validate that the email does not already exist in the database
    def validate_email(self, email):
        user = users.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('Account with this email already exists.')


class UpdateAccount(FlaskForm):
    #in order to pass in the current user's email as well as the email input in the field to update the email, the __init__ method must be called to pass current email as a parameter
    def __init__(self, current_user_email):
        super().__init__()
        self.current_user_email = current_user_email

    email = StringField('Email', validators=[DataRequired(), Email()])
    password = StringField('Password', validators=[DataRequired(), Length(
        min=6, message="Password must be at least %(min)d characters long.")])
    submit_update = SubmitField("Update Account")

    #validate that the email is not in the database, unless it is the current user's email
    def validate_email(self, email):
        user = users.query.filter_by(email=email.data).first()
        if user and (email.data != self.current_user_email):
            raise ValidationError('Account with this email already exists.')
