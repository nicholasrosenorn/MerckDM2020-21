import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Button, Card } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import { API_DOMAIN, AMAZON_S3_DOMAIN }  from "../../../env.json";
import axios from "axios";
import mime from "mime";

// This component is used in many pages for image uploading
function ImageDisplayAndUpload({ image, setImage }) {

  let imageselectasync = async() => 
  {
    let res = await ImagePicker.requestCameraRollPermissionsAsync();

    if (res.granted === false)
    {
        alert('Camera Permission Denied');
        return; 
    }
    
    let pickerres = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });
    
    if (pickerres.cancelled === true) 
    {
        return;
    }

    const imageUri = pickerres.uri;
    const newImageUri =  "file:///" + imageUri.split("file:/").join("");

    var oData = new FormData();
    oData.append('image', {
      uri : newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop()
    });

    axios.post(`${API_DOMAIN}/image`, oData)
    .then(res => {
      setImage(res.data.imageUrl);
    })
    .catch(err => {
      alert(err);
    })
  };

  return (
    <>
      <Image
        source={{uri: AMAZON_S3_DOMAIN + '/' + image}}
        style={styles.userHeadShot}
      />
      <View style={{flex: 1, flexDirection: "row", width: "100%", marginBottom: 10}}>
        {/* Upload image by using camera */}
        <Button
          title="Take a picture"
          type="outline"
          onPress={() => alert("please implement the camera functionality based on the environment")}
          containerStyle={{flexGrow: 1}}
        />

        {/* Upload image from phone's local image library */}
        <Button
          title="Select a picture"
          type="outline"
          onPress={imageselectasync} 
          containerStyle={{flexGrow: 1}}
        />
      </View>
    </>
  );

}

export default ImageDisplayAndUpload;