import React, { Component } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackgroundComponent,
    TouchableOpacity
} from "react-native";
import Button from "../../Utils/RoundedButton.js";
import styles from "./styles";
import colors from "./colors";
import Icon from "react-native-vector-icons/FontAwesome";
import { FlatGrid } from "react-native-super-grid";
import axios from "axios";
import { API_DOMAIN }  from "../../../env.json";

export default class home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.mainpage_wrapper}>
                <View style={styles.mainpage_row}>
                    <Image 
                        source={require("../../../assets/merck_image.png")}
                        style={styles.image}>
                    </Image>
                </View>
                <View style={styles.mainpage_row}>

                    <TouchableOpacity
                        style={styles.mainpage_button}
                        onPress={() => {
                            this.props.navigation.navigate('Profile')
                        }}
                    >
                        <Icon name='user' size={30}/>
                        <Text style={styles.mainpage_button_text}>Account {"\n"}Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.mainpage_button}
                        onPress={() => this.props.navigation.navigate('Edit Profile')}
                    >
                        <Icon name='edit' size={30}/>
                        <Text style={styles.mainpage_button_text}>Edit {"\n"}Profile</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.mainpage_row}>
                    <TouchableOpacity
                        style={styles.mainpage_button}
                        onPress={() => this.props.navigation.navigate('Questions')}>
                        <Icon name='cloud' size={30}/>
                        <Text style={styles.mainpage_button_text}>Submit {"\n"}New Entry</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.mainpage_button}
                        onPress={() => this.props.navigation.navigate('Entries')}>
                        <Icon name='search' size={30}/>
                        <Text style={styles.mainpage_button_text}>View {"\n"}Entries</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}  