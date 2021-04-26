
import React, { Component, useState, useEffect} from 'react';
import { Modal, Text, TouchableOpacity, View, Image} from "react-native";
// import {RNCamera} from 'react-native-camera';           //for phone tests
import { Camera } from 'expo-camera';                       //for expo tests
import { Button } from "react-native-paper";
import * as Permissions from 'expo-permissions';
import Camstyles from './styles';

//V2.0
const CameraModule = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  return (
  <Modal
  animationType="slide"
  transparent={true}
  visible={true}
  onRequestClose = {() => {
    props.setModalVisible();
  }}
  >
    <Camera
    style = {{ flex: 1}}
    ratio = "16:9"
    flashMode = {Camera.Constants.FlashMode.on}
    type = {type}
    ref = {(ref) => {
      setCameraRef(ref);
    }}
    >
      <View
      style={{
        flex: 1, 
        backgroundColor: "transparent",
        justifyContent: "flex-end",
      }}
      >
        <View
        style={{
          backgroundColor: "black",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }} 
        >

        <Button
        icon="close"
        style={{marginLeft: 12}}
        mode="outlined"
        color="white"
        onPress={() => {
          props.setModalVisible();
        }}
        >
          close
        </Button>

        <TouchableOpacity
        onPress={async () => {
          if (cameraRef) {
            let photo = await
            cameraRef.takePictureAsync();
            props.setImage(photo);
            props.setModalVisible();
          }
        }}
        >
          <View
          style={{
            borderWidth: 2,
            borderRadius: 50,
            borderColor: "white",
            height: 50,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
            marginTop: 16,
          }}
          >
            <View
            style={{
              borderWidth: 2,
              borderRadius: 50,
              borderColor: "white",
              height: 40,
              width: 40,
              backgroundColor: "white",
            }}
            ></View>
          </View>
        </TouchableOpacity>

        <Button
        icon = "axis-z-rotate-clockwise"
        style = {{ marginRight: 12 }}
        mode = "outlined"
        color = "white"
        onPress = {() => {
          setType(
          type = Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
          );
        }}
        >
        {type === Camera.Constants.Type.back ? "Front" : "Back"}
        </Button>
        </View>
      </View>
    </Camera>
  </Modal>
);
};

export default function CameraTake() {
  
  const [image, setImage] = useState(null);
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  <View style={Camstyles.buttonHeader}>
  <Button title="Back" onPress={() => navigation.navigate("Home")}/>
  {/* <Button title="Edit" onPress={() => navigation.navigate("EditProfile")}/> */}
  </View>

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "white",
          width: 120,
          height: 120,
          borderRadius: 100,
          marginBottom: 8,
        }}>
        <Image
          source={{ uri: image }}
          style={{ width: 120, height: 120, borderRadius: 100 }}
        />
      </View>
      <Button
        style={{ width: "30%", marginTop: 16 }}
        icon="camera"
        mode="contained"
        onPress={() => {
          setShowCamera(true);
        }}
      >
        Camera
      </Button>
    {camera && (
        <CameraModule
          showModal={camera}
          setModalVisible={() => setShowCamera(false)}
          setImage={(result) => setImage(result.uri)}
        />
      )}
    </View>
  );
}