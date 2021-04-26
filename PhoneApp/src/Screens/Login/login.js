import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import styles from './styles';
import { firebase } from '../../Firebase/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import axios from "axios";
import { API_DOMAIN }  from "../../../env.json";

function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onLoginPress = () => {
        if (email === "" || password === "") {
            alert("Please fill in all the required inputs");
            return;
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {

                // get user ID from the SQL database
                axios.post(`${API_DOMAIN}/patient-account/login`, {email: email})
                .then(res => {
                    global.patientId = res.data.patientId;
                    console.log("the current user id is " + global.patientId)
                    navigation.navigate('Home');
                })
                .catch(err => {
                    alert("Sign in failed. Please try again");
                    return;
                })

            })
            .catch(error => {
                alert("The username and password are incorrect. Please try again")
            })
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/merck_image.png')} style={styles.merckpic} />
            
            <Input
                placeholder='email@address.com'
                leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'lock', size: 35}}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />


            <Button
                title="Login"
                onPress={() => onLoginPress()}
                // buttonStyle={{width: 150}}
                containerStyle={{width: '95%'}}
            />

            <Text style={{ marginTop: 8 }} />

            <Button
                title="Create Account"
                type="outline"
                onPress={() => {
                    navigation.navigate("CreateAccount")
                }
                }
                containerStyle={{width: '95%'}}
            />
    
        </View>
    );
};

export default Login;