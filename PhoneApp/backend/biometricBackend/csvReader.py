import pandas as pd
import json
import requests
import sys

file = str(sys.argv[1])
data = pd.read_csv(file)

url = "http://localhost:3000/user"

for index, row in data.iterrows():
    obj = {'collection_date': row["Date"],
           'steps': row["Steps"],
           'floors_climbed': row["Floors Climbed"],
           'total_miles': row["Total Miles"],
           'lightly_active_miles': ["Lightly Active Miles"],
           'moderately_active_miles': row["Moderately Active Miles"],
           'very_active_miles': row["Very Active Miles"],
           'sedentary_minutes': row["Sedentary Minutes"],
           'lightly_active_minutes': row["Lightly Active Minutes"],
           'fairly_active_minutes': row["Fairly Active Minutes"],
           'very_active_minutes': row["Very Active Minutes"],
           'hr30_100_minutes': row["HR 30-100 Minutes"],
           'hr100_140_minutes': row["HR 100-140 Minutes"],
           'hr140_170_minutes': row["HR 140-170 Minutes"],
           'hr170_220_minutes': row["HR 170-220 Minutes"],
           'average_resting_heartrate': row["Average Resting HR"],
           'bmi': row["BMI"],
           'sleep_efficiency': row["Sleep Efficiency"],
           'weight': row["Weight"],
           "minutes_asleep": row["Minutes Alseep"],
           'fbusername': row["username"]
           }

    x = requests.post(url, data=obj)
