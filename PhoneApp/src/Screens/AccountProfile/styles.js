import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  userHeadShot: {
    width: 200,
    height: 200,
    borderRadius: 200,
    marginBottom: 10,
    marginTop: 10
  },
  buttonHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    maxHeight: 50
  },
  btnForHeader: {
    color: '#737373',
  },
  mainBody: {
    flexGrow: 1,
    width: '100%',
    flex: 1,
    alignItems: 'center'
  },
  userDataText: {
    fontSize: 15,
    color:'grey',
    alignSelf: "flex-start", 
    marginLeft: 8
  },
  userDataContent: {
    fontSize: 20, 
    color: "black"
  },
    mainpage_button: {
    backgroundColor: "#e5e5e5",
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 10,
    flex: 1,
    justifyContent: 'center',
  },
  mainpage_button_text: {
    fontSize: 20,

    textAlign: "center",
    // alignSelf: "center",
    // height: 100,
    
  }
});

export default styles;
