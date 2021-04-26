import React, { useState } from 'react';
import { TextInput, Image, TouchableOpacity, StyleSheet, Text, View, Picker, ScrollView } from 'react-native';
import styles from './styles'
import axios from "axios";
import { firebase } from '../../Firebase/config'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Card } from 'react-native-elements';
import { API_DOMAIN }  from "../../../env.json";
import ImageDisplayAndUpload from '../../Components/ImageDisplayAndUpload/ImageDisplayAndUpload';

function CreateAccountScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [height, setHeight] = useState("");
  const [image, setImage] = useState("");

  const createAccount = () => {

    // we don't check image here, cuz image is not required
    if (username === "" || email === "" || password === "" || firstname === "" || 
        lastname === "" || gender === "" || dateOfBirth === "" || height === 0) {
      alert("Please fill in all the required inputs");
      return;
    }

    // send the data to the server
    let newPatient = {
      first_name: firstname,
      last_name: lastname,
      username: username,
      email: email,
      gender: gender,
      date_of_birth: dateOfBirth,
      height_cm: parseInt(height, 10),
      image: image
    };

    // store login data in firebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password) // make sure that this email is unique in firebase auth
      .then((response) => {

        // store new user information into the SQL database
        axios.post(`${API_DOMAIN}/patient-account`, newPatient)
        .then()
        .catch(err => {
          alert("New account creation failed. This username has been used");
          return;
        });

        alert("New account successfully created");
        navigation.navigate('Login');

      }).catch((error) => {
        alert("New account creation failed. This email has been used");
        return;
      });
  };

  return (
    <ScrollView style={{backgroundColor: '#6ed0d4'}}>
      <View style={styles.container}>
        <ImageDisplayAndUpload
          image={image}
          setImage={setImage}        
        />
        <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Username</Text>
        <Input
          placeholder='Username'
          leftIcon={{ type: 'font-awesome', name: 'user', size: 35}}
          maxLength={20}
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Email</Text>
        <Input
          placeholder='email@address.com'
          leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Password</Text>
        <Input
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock', size: 35}}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Text style={{alignSelf: "flex-start", marginLeft: 8}}>First name</Text>
        <Input
          placeholder='Adam'
          value={firstname}
          onChangeText={text => setFirstname(text)}
        />

        <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Last name</Text>
        <Input
          placeholder='Smith'
          value={lastname}
          onChangeText={text => setLastname(text)}
        />

        <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Gender</Text>
        <Picker
          style={{ height: 50, width: "100%" }}
          selectedValue={gender}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
        >
          <Picker.Item label="Please select" value="" />
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

        <Text style={{alignSelf: "flex-start", marginLeft: 8, marginTop: 8}}>Height (cm)</Text>
        <Input
          placeholder="170"
          maxLength={20}
          value={height}
          onChangeText={text => setHeight(text)}
          keyboardType="numeric"
        />

        <Text style={{ marginTop: 0 }} />

        <Button
          title="Create account"
          onPress={() => {
            createAccount();
          }}
          containerStyle={{width: '95%'}}
        />

        <Text style={{ marginTop: 20 }} />

      </View>
    </ScrollView>
  );
};




export default CreateAccountScreen;