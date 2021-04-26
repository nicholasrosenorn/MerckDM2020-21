import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  AppRegistry,
} from "react-native";
import { color } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Card , Input} from 'react-native-elements';
import { API_DOMAIN, AMAZON_S3_DOMAIN  }  from "../../../env.json";
import axios from "axios";


const styles = StyleSheet.create({
  header: {
    fontSize: 40, color: 'rgb(0, 131, 136)', 
    textAlign: "center",
    marginTop: 10
  },
  background: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  entryBox: {
    borderWidth: 1,
    width: "95%",
    margin: 5,
    padding: 10,
    borderColor: "rgb(0, 131, 136)",
    textAlign: "center"
  },
  buttonHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    maxHeight: 35
  }
});

export default function Entries({ navigation }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {

    axios.get(`${API_DOMAIN}/patient-questionnaire/`, { params: { patientId: global.patientId }})
    .then((res) => {
      setEntries(res.data);
    })
    .catch((err) => {
      alert(err);
    });
  }, []);

  let displaySQLDateTime = (dateTime) => {
    let entryDate = new Date(dateTime);
    return String(entryDate.getFullYear()) + '-' + 
           String(entryDate.getMonth() + 1) + '-' + 
           String(entryDate.getDate()) + ' ' + 
           String(entryDate.getHours()) + ':' +
           String(entryDate.getMinutes()) + ':' +
           String(entryDate.getSeconds());   
  }

  return (
    <ScrollView style={{width:"100%", backgroundColor: '#6ed0d4'}}>
      <View style={{width:"100%", flex: 1, alignItems: "center", marginBottom: 10}}>
        <Card containerStyle={{width: "90%"}}>
          <View style={{flex: 1, alignItems: "center", width: "100%"}}>
            <Text style={styles.header}>Entries List</Text>
            {entries.map((entry, index) => {
              return (
                <View style={{width: "100%"}} key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Questions', {update: true, dateTime: displaySQLDateTime(entry.input_date)})
                    }}
                    style={{width: "100%", alignItems: "center"}}
                  >
                  <Text style={styles.entryBox}>Entry ({displaySQLDateTime(entry.input_date)})</Text>
                  </TouchableOpacity>
                </View>
              );
            })}

          </View>
        </Card>
      </View>
    </ScrollView>
  );

}
  