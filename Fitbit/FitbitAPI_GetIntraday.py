oneDate = pd.datetime(year = 2019, month = 10, day = 21)
oneDayData = auth2_client.intraday_time_series('activities/heart', oneDate, detail_level='15min')
#Returns info like:
#'activities-heart-intraday': {
#'dataset': [
#    {'time': '00:00:00', 'value': 66},
#    {'time': '00:00:10', 'value': 67},
#    {'time': '00:00:25', 'value': 67},
#    {'time': '00:00:40', 'value': 67},
#    {'time': '23:57:40', 'value': 84},
#    {'time': '23:58:40', 'value': 85},
#    {'time': '23:58:50', 'value': 80}
#],


{
    "activities-heart": [
        {
            "customHeartRateZones": [],
            "dateTime": "today",
            "heartRateZones": [
                {
                    "caloriesOut": 2.3246,
                    "max": 94,
                    "min": 30,
                    "minutes": 2,
                    "name": "Out of Range"
                },
                {
                    "caloriesOut": 0,
                    "max": 132,
                    "min": 94,
                    "minutes": 0,
                    "name": "Fat Burn"
                },
                {
                    "caloriesOut": 0,
                    "max": 160,
                    "min": 132,
                    "minutes": 0,
                    "name": "Cardio"
                },
                {
                    "caloriesOut": 0,
                    "max": 220,
                    "min": 160,
                    "minutes": 0,
                    "name": "Peak"
                }
            ],
            "value": "64.2"
        }
    ],
    "activities-heart-intraday": {
        "dataset": [
            {
                "time": "00:00:00",
                "value": 64
            },
            {
                "time": "00:00:10",
                "value": 63
            },
            {
                "time": "00:00:20",
                "value": 64
            },
            {
                "time": "00:00:30",
                "value": 65
            },
            {
                "time": "00:00:45",
                "value": 65
            }
        ],
        "datasetInterval": 1,
        "datasetType": "second"
    }
}



