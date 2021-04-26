import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './styles'
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Card } from 'react-native-elements';
import { API_DOMAIN, AMAZON_S3_DOMAIN  }  from "../../../env.json";
import ImageDisplayAndUpload from '../../Components/ImageDisplayAndUpload/ImageDisplayAndUpload';

function AccountProfile({ navigation }) {
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("123");
  const [height, setHeight] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {

    // this will be called whenever this page gets focused. If you just put the GET request directly inside the useEffect hook, there are not going to be called when you navigate back using the react navigation header button
    const focus = navigation.addListener('didFocus', () => {

      setLoading(true);

      axios.get(`${API_DOMAIN}/patient-account/${global.patientId}`)
      .then((res) => {
        let patient = res.data;
        setDateOfBirth(patient.date_of_birth);
        setEmail(patient.email);
        setFirstname(patient.first_name);
        setGender(patient.gender);
        setHeight(patient.height_cm);
        setImage(patient.image);
        setLastname(patient.last_name);
        setUsername(patient.username);
        if (patient.patient_id !== global.patientId) {
          alert("patient id is not the same from the SQL database! Warning!");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    });

    // unlisten
    return () => focus.remove();
  }, []);

  return (
    loading ? 
    <View style={{flex: 1, justifyContent: "center"}}>
      <ActivityIndicator size={100} color='#6ed0d4'/>
    </View> 
    : 
    <ScrollView style={{backgroundColor: '#6ed0d4'}}>
      <View style={{flex:1, flexDirection: "column", alignItems: "center", justifyContent: "flex-start", backgroundColor: '#6ed0d4', paddingBottom: 10}}>

        <View style={styles.mainBody}>

          <Card containerStyle={{width: "90%"}}>
            <Card.Title style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>User Info</Card.Title>
            <Card.Divider/>
            <View style={{flex: 1, alignItems: "center", width: "100%"}}>
              <Image
                source={{uri: AMAZON_S3_DOMAIN + '/' + image}}
                style={styles.userHeadShot}
              />
              
              <Text style={styles.userDataText}>Patient ID {'\n'}<Text style={styles.userDataContent}>{global.patientId}</Text></Text>
              <Text style={styles.userDataText}>Username {'\n'}<Text style={styles.userDataContent}>{username}</Text></Text>
              <Text style={styles.userDataText}>First Name {'\n'}<Text style={styles.userDataContent}>{firstname}</Text></Text>
              <Text style={styles.userDataText}>Last Name {'\n'}<Text style={styles.userDataContent}>{lastname}</Text></Text>
              <Text style={styles.userDataText}>Gender {'\n'}<Text style={styles.userDataContent}>{gender}</Text></Text>
              <Text style={styles.userDataText}>Date of Birth {'\n'}<Text style={styles.userDataContent}>{dateOfBirth}</Text></Text>
              <Text style={styles.userDataText}>Height (cm) {'\n'}<Text style={styles.userDataContent}>{height}</Text></Text>
              <Text style={styles.userDataText}>Email {'\n'}<Text style={styles.userDataContent}>{email}</Text></Text>

              <Button 
                title="Edit" 
                onPress={() => navigation.navigate("Edit Profile")}
                containerStyle={{width: "95%", marginTop: 10}}
              />
            </View>
          </Card>
          
  
        </View>
      </View>
    </ScrollView>
  );
};
export default AccountProfile;