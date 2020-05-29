from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import yaml

#instantiate object for Flask class
app = Flask(__name__)

#configure database
db = yaml.load(open('templates/db.yaml')) # can use .yaml file for privacy
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']
app.config["MYSQL_CURSORCLASS"] = 'DictCursor'

#instantiate object for MySQL module
mysql = MySQL(app)

#GETS all biometrics
@app.route("/biometrics", methods=["GET"])
def get_all_metrics():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM biotest.allBiometrics")
    rv = cur.fetchall()
    return jsonify(rv)

#GETS specific biometrics by index range 
@app.route("/biometrics/index/<index>-<index2>", methods=["GET"])
def get_metrics_rangeIndex(index, index2):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM biotest.allBiometrics WHERE myIndex >= " + index + " AND myIndex <= " + index2)
    rv = cur.fetchall()
    return jsonify(rv)

#GETS specific biometrics by date range for a user from biotest.allBiometrics df
@app.route("/biometrics/date/<index>/<index2>/<username>", methods=["GET"])
def get_metrics_rangeDate(index, index2, username):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM biotest.allBiometrics WHERE date_collected >= " + str(index) + " AND date_collected <= " + str(index2) + " AND username = '" + str(username) + "'")
    rv = cur.fetchall()
    return jsonify(rv)

#GETS specific biometrics by date range for a user from user's dataframe
@app.route("/biometrics/date/<index>/<index2>/<username>/users", methods=["GET"])
def get_metrics_rangeDateUsers(index, index2, username):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM biotest." + username + " WHERE date_collected >= " + str(index) + " AND date_collected <= " + str(index2) + " AND username = '" + str(username) + "'")
    rv = cur.fetchall()
    return jsonify(rv)

#execute application
if __name__ == '__main__':
    app.run(debug = True )