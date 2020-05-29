# create database
create database Biometrics;

#use the newly made database
use Biometrics;

#create new table with name as the Username of the users
create table Username (
myIndex INT,
date_collected DATE,
steps INT,
floors_climbed INT,
total_miles FLOAT,
lightly_active_miles FLOAT,
moderately_active_miles FLOAT,
very_active_miles FLOAT,
sedentary_minutes FLOAT,
lightly_active_minutes FLOAT,
fairly_active_minutes FLOAT,
very_active_minutes FLOAT,
HR30_100Minutes INT,
HR100_140Minutes INT,
HR140_170Minutes INT,
HR30170_220Minutes INT,
average_resting_HR INT,
bmi FLOAT,
minutes_asleep FLOAT,
sleep_efficiency FLOAT,
weight FLOAT,
username VARCHAR(20),
happiness_rating INT,
pain_rating INT
);

#load data from file into table
LOAD DATA LOCAL INFILE "/Path/To/File" INTO TABLE Username
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 rows
(myIndex, @date_collected, steps, floors_climbed, total_miles, lightly_active_miles, moderately_active_miles, 
very_active_miles, sedentary_minutes, lightly_active_minutes, fairly_active_minutes, very_active_minutes, 
HR30_100Minutes, HR100_140Minutes, HR140_170Minutes, HR170_220Minutes, average_resting_HR, bmi, minutes_asleep,
sleep_efficiency, weight, username, happiness_rating, pain_rating) SET date_collected =  STR_TO_DATE(@date_collected, '%Y-%m-%d');




