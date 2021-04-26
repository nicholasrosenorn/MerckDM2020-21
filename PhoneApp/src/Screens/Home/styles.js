import colors from './colors'
import React from 'react';
import { TextInput, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { color } from 'react-native-reanimated';


const styles = StyleSheet.create({
  mainpage_wrapper: {
    flex: 1,
    backgroundColor: colors.green01,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mainpage_row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "red"
  },
  mainpage_button: {
    backgroundColor: "white",
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  mainpage_button_text: {
    fontSize: 20,

    textAlign: "center",
    // alignSelf: "center",
    // height: 100,
    
  },
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: colors.green01,
  },
  welcomeWrapper: {
    flex: 1,
    display: "flex",
    marginTop: 30,
    padding: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 50,
    marginBottom: 40,
    color: colors.white,
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "300",
    marginBottom: 40,
    textAlign: 'center'
  },
  buttonwrapper: {
    padding: 15,
    display: "flex",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.white,
  },
  buttonText: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
  ButtonTextWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  merckIcon: {
    color: colors.green01,
    position: "relative",
    left: 20,
    zIndex: 8,
  },
  TermsAndConditions:
  {
    flexDirection: 'row',
    marginTop: 30,
  },
  termsText:
  {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    margin: 5,
    backgroundColor: '#4CAF50',
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#fff",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  }
});

export default styles; 