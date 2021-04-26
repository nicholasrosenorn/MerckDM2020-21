from flask import render_template, url_for, flash, redirect, request
from merck_webapp.forms import PatientInformation, OngoingStudyData
from merck_webapp import app, db
from merck_webapp.models import patient, study_specific_data

@app.route("/")
@app.route("/home")
def home():
	patients = patient.query.all()
	return render_template('home.html', patients=patients)

@app.route("/patientinformation", methods=['GET', 'POST'])
def patient_information():
	form = PatientInformation()
	if form.validate_on_submit():
		curr_patient = patient(first_name= form.first_name.data, last_name = form.last_name.data, username = form.username.data, email = form.email.data, gender=form.gender.data, date_of_birth = form.date_of_birth.data, height_cm = form.height_cm.data)
		db.session.add(curr_patient)
		db.session.commit()
		flash(f'Patient {form.first_name.data} created', 'success')
		return redirect(url_for('home'))
	return render_template('patient_input.html', title="Patient Information", form=form)

@app.route("/studydatainformation", methods=['GET', 'POST'])
def study_information():
	form = OngoingStudyData()
	if form.validate_on_submit():
		curr_patient = patient.query.filter_by(username=form.username.data).first()
		#curr_patient_id = curr_patient.patient_id
		if curr_patient:
			study_data = study_specific_data(patient_id=curr_patient.patient_id, username=form.username.data, input_date=form.input_date.data, family_history=form.family_history.data, diagnostic_notes=form.diagnostic_notes.data)
			db.session.add(study_data)
			db.session.commit()
			flash(f'Information submitted for {form.username.data}', 'success')
		else:
			flash('Patient does not exist')
		return redirect(url_for('home'))
	return render_template('study_data.html', title="Study Information", form=form)








