import React, { useState, useEffect } from 'react';
import { TextInput, Image, TouchableOpacity, StyleSheet, Text, View, Picker, ActivityIndicator } from 'react-native';
import styles from './styles'
import axios from "axios";
import { firebase } from '../../Firebase/config';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Card, Divider } from 'react-native-elements';
import ImageDisplayAndUpload from '../../Components/ImageDisplayAndUpload/ImageDisplayAndUpload';
import { API_DOMAIN, AMAZON_S3_DOMAIN  }  from "../../../env.json";

// user cannot change anything that's related to firebase auth
// 1. email

function EditProfile({ navigation }) {
  const [loading, setLoading] = useState(true);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [height, setHeight] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {

    axios.get(`${API_DOMAIN}/patient-account/${global.patientId}`)
    .then((res) => {
      let patient = res.data;
      setDateOfBirth(patient.date_of_birth);
      setFirstname(patient.first_name);
      setGender(patient.gender);
      setHeight(String(patient.height_cm));
      setImage(patient.image);
      setLastname(patient.last_name);
      setUsername(patient.username);
      if (patient.patient_id !== global.patientId) {
        alert("patient id is not the same from the SQL database! Warning!");
      }
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      alert(err);
    });

  }, []);

  const editAccount = () => {
    // we don't check image here, cuz image is not required
    if (username === "" || firstname === "" || 
        lastname === "" || gender === "" || dateOfBirth === "" || height === "") {
      alert("Please fill in all the required inputs");
      return;
    }

    let newPatient = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      gender: gender,
      date_of_birth: dateOfBirth,
      height_cm: parseInt(height, 10),
      image: image
    };

    console.log("edit profile page sends this edit object to server:")
    console.log(newPatient)
    // store new user information into the SQL database
    axios.put(`${API_DOMAIN}/patient-account/${global.patientId}`, newPatient)
    .then(res => {
      // pull the newest data through a GET request
      setLoading(true);

      axios.get(`${API_DOMAIN}/patient-account/${global.patientId}`)
      .then((res) => {
        let patient = res.data;
        setDateOfBirth(patient.date_of_birth);
        setFirstname(patient.first_name); 
        setGender(patient.gender);
        setHeight(String(patient.height_cm));
        setImage(patient.image);
        setLastname(patient.last_name);
        setUsername(patient.username);
        if (patient.patient_id !== global.patientId) {
          alert("patient id is not the same from the SQL database! Warning!");
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
    })
    .catch(err => {
      alert("Edit account profile failed. This username has been used");
      return;
    });

  }

  return (
    loading ? 
    <View style={{flex: 1, justifyContent: "center"}}>
      <ActivityIndicator size={100} color='#6ed0d4'/>
    </View> 
    : 
    <ScrollView style={{backgroundColor: '#6ed0d4'}}>
      <View style={styles.container}>
        <Card containerStyle={{width: "90%"}}>
          <View style={{flex: 1, alignItems: "center", width: "100%"}}>

            <ImageDisplayAndUpload
              image={image}
              setImage={setImage}        
            />

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>First name</Text>
            <Input
            placeholder="First name"
            maxLength={20}
            value={firstname}
            onChangeText={text => setFirstname(text)}
            />

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Last name</Text>
            <Input
              placeholder="Last name"
              maxLength={20}
              value={lastname}
              onChangeText={text => setLastname(text)}
            />

            {/* <Divider /> */}

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Gender</Text>
            <Picker
              style={{ height: 50, width: "100%" }}
              selectedValue={gender}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            >
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />
              <Picker.Item label="Other" value="O" />
            </Picker>

            <Text style={{alignSelf: "flex-start", marginLeft: 8, marginTop: 8}}>Date of birth</Text>
            <Input
              placeholder="YYYY-MM-DD"
              maxLength={20}
              value={dateOfBirth}
              onChangeText={text => setDateOfBirth(text)}
            />

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Height</Text>
            <Input
              placeholder="Height (cm)"
              maxLength={20}
              value={height}
              keyboardType="numeric"
              onChangeText={text => setHeight(text)}
            />

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Username</Text>
            <Input
              placeholder="Username"
              maxLength={20}
              value={username}
              onChangeText={text => setUsername(text)}
            />

            <Button
              title="Save" 
              onPress={editAccount}
              containerStyle={{width: "95%"}}
            ></Button>
          </View>
        </Card>
        <Text style={{ marginTop: 10 }} />

      

      </View>
    </ScrollView>
  );
};

export default EditProfile;