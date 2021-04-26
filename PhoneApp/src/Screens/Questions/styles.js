import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        maxHeight: 35,
        marginBottom: 10
      },
    submit: {
        bottom: 50,
        justifyContent: "center",
    },
    background: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    questions: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: '#6ed0d4'
    },
    userHeadShot: {
        width: 200,
        height: 200,
        borderRadius: 200,
        marginBottom: 10,
        marginTop: 10
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10
    }
});
  

  export default styles;