import React, { Component } from "react";
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import propTypes from 'prop-types';
import styles from './styles';
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export default class Button extends Component {
   render() {
      const { text, icon, textColor, backgroundColor, handleOnPress } = this.props;
      return (
         <TouchableHighlight
            style={[{ backgroundColor }, styles.buttonwrapper]}
            onPress={handleOnPress}
         >
         <View>
         {/* //Add icon later */}
            {/* <Icon name="merck" backgroundColor="#3b5998" /> */}
            <Text style={[{ textColor }, styles.buttonText]}>{text}</Text>
         </View>
       </TouchableHighlight>

     );
  }
}

Button.propTypes = {
  text: propTypes.string.isRequired,
  textColor: propTypes.string,
  backgroundColor: propTypes.string,
//   icon: propTypes.object,
  handleOnPress: propTypes.func.isRequired,
};