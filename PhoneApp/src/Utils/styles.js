import colors from './colors'
import React from 'react';
import { TextInput, Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({
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
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "300",
    marginBottom: 40,
    textAlign:'center'
  },
  buttonwrapper: {
    padding: 15,
    display: "flex",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.white,
  },
  buttonText: {
    fontSize: 16,
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
    flexDirection:'row',
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
    width:100,
    margin: 5,
    backgroundColor: "#7B1FA2",
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#fff",
    padding: 10,
  }
});

export default styles; 