//Modules imports 
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

//File imports 
import AccountProfile from './src/Screens/AccountProfile/accountProfile';
import CreateAccount from './src/Screens/CreateAccount/createAccount';
import EditProfile from './src/Screens/EditProfile/editProfile';
import Entries from './src/Screens/Entries/entries';
import Home from './src/Screens/Home/home';
import Login from './src/Screens/Login/login';
import Questions from './src/Screens/Questions/questions';
import CameraTake from './src/Camera/cameraapp';
import ImageDisplayAndUpload from './src/Components/ImageDisplayAndUpload/ImageDisplayAndUpload';

export default function App() {
  return <SignedOut />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createStackNavigator(
  {
    'Profile': AccountProfile,
    CreateAccount: CreateAccount,
    'Edit Profile': EditProfile,
    Entries: Entries,
    'Home': Home,
    Login: Login,
    Questions: Questions,
    Camera: CameraTake,
    ImageDisplayAndUpload: ImageDisplayAndUpload
  },
  {
    initialRouteName: 'Login',
  }
);

export const SignedOut = createAppContainer(Stack);
