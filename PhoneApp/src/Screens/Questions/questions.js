import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  Image,
  Picker,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Card , Input, Slider } from 'react-native-elements';
import InputSpinner from "react-native-input-spinner";
import * as ImagePicker from 'expo-image-picker';
import { API_DOMAIN, AMAZON_S3_DOMAIN  }  from "../../../env.json";
import ImageDisplayAndUpload from '../../Components/ImageDisplayAndUpload/ImageDisplayAndUpload';

export default function QuestionScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const [happiness, setHappiness] = useState(5);
  const [unusualSymptoms, setUnusualSymptoms] = useState("None");
  const [smokingAlcohol, setSmokingAlcohol] = useState("");
  const [otherMedication, setOtherMedication] = useState("None");
  const [diagnosis, setDiagnosis] = useState("None");
  const [sleep, setSleep] = useState(7);
  const [work, setWork] = useState(8);
  const [image, setImage] = useState("");
  const [meals, setMeals] = useState("");
  const [water, setWater] = useState("");
  const [medicationTiming, setMedicationTiming] = useState("");

  let isUpdate = navigation.getParam('update', false);
  let dateTime = navigation.getParam('dateTime', null);

  useEffect(() => {
    if (isUpdate) {

      setLoading(true);

      axios.get(`${API_DOMAIN}/patient-questionnaire`, { params: { patientId: global.patientId, dateTime: dateTime }})
      .then((res) => {
        let questionnaire = res.data;

        setDiagnosis(questionnaire.diagnosis);
        setHappiness(questionnaire.happiness);
        setWork(questionnaire.hours_worked);
        setImage(questionnaire.image);
        setMeals(String(questionnaire.meals));
        setMedicationTiming(String(questionnaire.medication_timing));
        setOtherMedication(questionnaire.other_medication);
        setSleep(questionnaire.sleep);
        setSmokingAlcohol(questionnaire.smoking_alcohol === 1 ? "Yes" : "No");
        setUnusualSymptoms(questionnaire.unusual_symptoms);
        setWater(String(questionnaire.water_intake));
        
        if (questionnaire.patient_id !== global.patientId) {
          alert("patient id is not the same from the SQL database! Warning!");
        }
        setLoading(false);

      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });

    }
  }, []);

  const pressHandler = () => {
    // we don't check image here, cuz image is not required
    if (unusualSymptoms === "" || meals === "" || diagnosis === "" ||
        medicationTiming === "" || smokingAlcohol === "" || otherMedication === "" || water === "") {
      alert("Please fill in all the required inputs");
      return;
    }

    let phoneAppData = {
      patient_id: global.patientId,
      happiness: happiness,
      sleep: sleep,
      hours_worked: work,
      unusual_symptoms: unusualSymptoms,
      meals: parseInt(meals, 10),
      medication_timing: parseInt(medicationTiming, 10),
      smoking_alcohol: smokingAlcohol === "Yes" ? true : false,
      other_medication: otherMedication,
      water_intake: parseInt(water, 10),
      diagnosis: diagnosis,
      image: image
    };

    if (isUpdate) {
      axios.put(`${API_DOMAIN}/patient-questionnaire/`, phoneAppData, { params: { patientId: global.patientId, dateTime: dateTime }})
      .then((res) => {
        alert("Update was successful");
        navigation.navigate("Home");
      })
      .catch((err) => {
        alert("Updating new questionnaire failed");
        navigation.navigate("Home");
        return;
      });

    } else {
      axios.post(`${API_DOMAIN}/patient-questionnaire`, phoneAppData)
      .then((res) => {
        alert("Uploaded a new questionnaire");
        navigation.navigate("Home");
      })
      .catch((err) => {
        alert("Uploading new questionnaire failed");
        navigation.navigate("Home");
        return;
      });
    }
    

  };

  return (
    loading ? 
    <View style={{flex: 1, justifyContent: "center"}}>
      <ActivityIndicator size={100} color='#6ed0d4'/>
    </View> 
    : 
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>

        <Card containerStyle={{width: "90%"}}>
          <View style={{flex: 1, alignItems: "center", width: "100%"}}>
            
            <ImageDisplayAndUpload
              image={image}
              setImage={setImage}        
            />

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>On a scale of 1 - 10, how happy are you today?</Text>

            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', width: "90%" }}>
              <Slider
                value={happiness}
                onValueChange={setHappiness}
                maximumValue={10}
                minimumValue={1}
                step={1}
                trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                thumbProps={{
                  children: (
                    <Icon
                      name="circle"
                      type="font-awesome"
                      size={20}
                      reverse
                      containerStyle={{ bottom: 20, right: 20 }}
                      color="#6ed0d4"
                    />
                  ),
                }}
              />
              <Text>Happiness: {happiness}</Text>
            </View>

            <Text style={{alignSelf: "flex-start", marginLeft: 8, marginTop: 10}}>How many hours did you sleep last night?</Text>
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', width: "90%" }}>
              <Slider
                value={sleep}
                onValueChange={setSleep}
                maximumValue={14}
                minimumValue={1}
                step={1}
                trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                thumbProps={{
                  children: (
                    <Icon
                      name="circle"
                      type="font-awesome"
                      size={20}
                      reverse
                      containerStyle={{ bottom: 20, right: 20 }}
                      color="#6ed0d4"
                    />
                  ),
                }}
              />
              <Text>Hour(s): {sleep}</Text>
            </View>
          

            <Text style={{alignSelf: "flex-start", marginLeft: 8, marginTop: 10}}>How many hours did you work yesterday?</Text>
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', width: "90%" }}>
              <Slider
                value={work}
                onValueChange={setWork}
                maximumValue={14}
                minimumValue={1}
                step={1}
                trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                thumbProps={{
                  children: (
                    <Icon
                      name="circle"
                      type="font-awesome"
                      size={20}
                      reverse
                      containerStyle={{ bottom: 20, right: 20 }}
                      color="#6ed0d4"
                    />
                  ),
                }}
              />
              <Text>Hour(s): {work}</Text>
            </View>

            <Text style={{alignSelf: "flex-start", marginLeft: 8, marginTop: 10}}>Have you experienced any unusual symptoms?</Text> 
            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>If your answer is yes, please describe your symptoms.</Text>
            <Input
              style={styles.input}
              placeholder="None"
              value={unusualSymptoms}
              onChangeText={text => setUnusualSymptoms(text)}
            />

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Have you consumed any alcohol or smoked today?</Text>

            <Picker
              style={{ height: 50, width: "100%" }}
              selectedValue={smokingAlcohol}
              onValueChange={(itemValue, itemIndex) => setSmokingAlcohol(itemValue)}
            >
              <Picker.Item label="Please Select" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>

            <Text style={{alignSelf: "flex-start", marginLeft: 8, marginTop: 10}}>
              Have you taken any other medication today outside of Merck's clinical
              trial program? If yes, which medication?
            </Text>
            <Input
              style={styles.input}
              placeholder="None"
              value={otherMedication}
              onChangeText={text => setOtherMedication(text)}
            />

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>Have you been recently diagnosed with other illnesses? If yes, please describe?</Text>
            <Input
              style={styles.input}
              placeholder="None"
              value={diagnosis}
              onChangeText={text => setDiagnosis(text)}
            />

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>How many meals have you had today?</Text>
            <Input
              style={styles.input}
              placeholder="Please type a number"
              value={meals}
              keyboardType="numeric"
              onChangeText={text => setMeals(text)}
            />

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>How many times have you taken your medication today?</Text>
            <Input
              style={styles.input}
              placeholder="Please type a number"
              value={medicationTiming}
              keyboardType="numeric"
              onChangeText={text => setMedicationTiming(text)}
            />

            <Text style={{alignSelf: "flex-start", marginLeft: 8}}>How many ounces of water have you drunk today?</Text>
            <Input
              style={styles.input}
              placeholder="Please type a number"
              value={water}
              keyboardType="numeric"
              onChangeText={text => setWater(text)}
            />

            <Button color="#008b8b" title={isUpdate ? "Update" : "Submit"} onPress={pressHandler} containerStyle={{width: "95%"}}/>
          </View>
        </Card>
        
      </View>
    </ScrollView>
  );
}