from flask import render_template, url_for, flash, redirect, request
from merck_webapp.forms import PatientInformation, OngoingStudyData, LogIn, CreateAccount, UpdateAccount
from merck_webapp import app, db, bcrypt
from merck_webapp.models import patient, study_specific_data, users, phone_app_data, fitbit_data
from flask_login import login_user, logout_user, current_user, login_required
import calendar
import datetime
import base64
import boto3
from config import S3_BUCKET, S3_KEY, S3_SECRET

#Each route requires @app.route decorator
#If route will get or post, requires those methods as parameters along with route name

@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LogIn() #initialize form
    if form.validate_on_submit(): #check for submission
        user = users.query.filter_by(email=form.email.data).first() #get data from users to check passwords
        if user and bcrypt.check_password_hash(user.password, form.password.data): #if the password is correct log the user in, current_user is updated behind the scenes
            login_user(user)
            return redirect(url_for('home'))
        else:
            flash('Login unsuccessful. Please check email and password.')
    return render_template('sign_in_page.html', title="Login", form=form)


@app.route("/create_account", methods=['GET', 'POST'])
def create_account():
    #if a logged in user makes his way to create account, redirect home
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = CreateAccount()
    if form.validate_on_submit():
        email = form.email.data #you access data from a form by calling data of the variable of the given form 
        password = form.password.data
        hashed = bcrypt.generate_password_hash(password).decode('utf-8')
        #initialize the SQLAlchemy table by passing in each column variable
        user = users(email=email, password=hashed)
        #must add SQLAlchemy table to db session and commit in order to place something in the db
        db.session.add(user)
        db.session.commit()
        flash('Account created! You are now able to log in.')
        return redirect(url_for('login'))
    return render_template("sign_up_page.html", title="Create Account", form=form)


#@login_required requires a authorized login to access the route

@app.route("/")
@app.route("/home")
@login_required
def home():
    #no logic needed here, all done in welcome.html
    return render_template('welcome.html')


@app.route("/patientinformation", methods=['GET', 'POST'])
@login_required
def patient_information():
    form = PatientInformation()
    if form.validate_on_submit():
        curr_patient = patient(first_name=form.first_name.data, last_name=form.last_name.data, username=form.username.data,
                               email=form.email.data, gender=form.gender.data, date_of_birth=form.date_of_birth.data, height_cm=form.height_cm.data)
        db.session.add(curr_patient)
        db.session.commit()
        flash(f'Patient {form.first_name.data} created', 'success')
        return redirect(url_for('home'))
    return render_template('patient_input.html', title="Patient Information", form=form)


@app.route("/studydatainformation", methods=['GET', 'POST'])
@login_required
def study_information():
    form = OngoingStudyData()
    if form.validate_on_submit():
        curr_patient = patient.query.filter_by(username=form.username.data).first() #returns None if not in patient table
        if curr_patient:
            study_data = study_specific_data(patient_id=curr_patient.patient_id, username=form.username.data,
                                             input_date=form.input_date.data, family_history=form.family_history.data, diagnostic_notes=form.diagnostic_notes.data)
            db.session.add(study_data)
            db.session.commit()
            flash(f'Information submitted for {form.username.data}', 'success')
        else:
            flash('Patient does not exist')
        return redirect(url_for('home'))
    return render_template('study_data.html', title="Study Information", form=form)


@app.route("/profile_home/<patient_id>", methods=['GET', 'POST'])
@login_required
def profile_home(patient_id):
    curr_patient = patient.query.filter_by(patient_id=patient_id).first()
    return render_template('profile_home.html', patient=curr_patient, calendar=calendar)


@app.route("/profile_timeline/<patient_id>", methods=['GET', 'POST'])
@login_required
def profile_timeline(patient_id):
    patient_surveys = phone_app_data.query.filter_by(patient_id=patient_id).order_by(phone_app_data.input_date.desc()).all()
    print(patient_surveys)
    cur_patient = patient.query.filter_by(patient_id=patient_id).first()
    return render_template('profile_timeline.html', surveys=patient_surveys, calendar=calendar, patient=cur_patient, datetime=datetime)


@app.route("/profile_notes/<patient_id>", methods=['GET', 'POST'])
@login_required
def profile_notes(patient_id):
    patient_notes = study_specific_data.query.filter_by(patient_id=patient_id).order_by(study_specific_data.input_date.desc())
    cur_patient = patient.query.filter_by(patient_id=patient_id).first()
    today = datetime.date.today()
    form = OngoingStudyData()
    if form.validate_on_submit():
        curr_patient = patient.query.filter_by(username=form.username.data).first()
        if curr_patient:
            study_data = study_specific_data(patient_id=curr_patient.patient_id, username=form.username.data,
                                             input_date=form.input_date.data, family_history=form.family_history.data, diagnostic_notes=form.diagnostic_notes.data)
            db.session.add(study_data)
            db.session.commit()
            flash(f'Information submitted for {form.username.data}', 'success')
        else:
            flash('Patient does not exist', 'danger')
    return render_template('profile_notes.html', form=form, notes=patient_notes, patient=cur_patient, today=today, calendar=calendar)


@app.route("/patient_fitbit_data/<patient_id>", methods=['GET', 'POST'])
@login_required
def patient_fitbit_data(patient_id):
    cur_patient = patient.query.filter_by(patient_id=patient_id).first()
    patient_fbdata = fitbit_data.query. filter_by(fbusername='mdw').all()
    return render_template('patient_fitbit_data.html', patient=cur_patient, rows_data=patient_fbdata)


@app.route("/patients", methods=['GET', 'POST'])
@login_required
def patients():
    patients = patient.query.all()
    return render_template('view_profiles.html', patients=patients)


@app.route("/visualizations", methods=['GET', 'POST'])
@login_required
def visualizations():
    return render_template('visualizations.html')


@app.route("/edit_account", methods=['GET', 'POST'])
@login_required
def edit_account():
    form = UpdateAccount(current_user.email)
    if form.validate_on_submit():
        email = form.email.data
        password = form.password.data
        hashed = bcrypt.generate_password_hash(password).decode('utf-8')
        user_from_db = db.session.query(users).filter_by(id=current_user.id).update({"email": email, "password": hashed})
        db.session.commit()
        flash('Account updated!')
        return redirect(url_for('home'))
    return render_template('edit_account.html', title='Edit Account', form=form)


@app.route("/logout")
@login_required
def logout():
    logout_user() #empties current_user
    return redirect(url_for('home'))


@app.route('/files')
def files():
    s3_resource = boto3.resource('s3')
    my_bucket = s3_resource.Bucket(S3_BUCKET)
    summaries = my_bucket.objects.all()

    return render_template('files.html', my_bucket=my_bucket, files=summaries)


@app.route('/download/<resource>')
def download_image(resource):
    """ resource: name of the file to download"""
    s3 = boto3.client('s3',
                      aws_access_key_id=S3_KEY,
                      aws_secret_access_key=S3_SECRET)

    url = s3.generate_presigned_url('get_object', Params={
                                    'Bucket': S3_BUCKET, 'Key': resource}, ExpiresIn=100)
    return redirect(url, code=302)
