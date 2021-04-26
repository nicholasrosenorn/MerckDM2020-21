
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6ed0d4',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    merckpic: {
        width: '60%',
        height: '20%',
        alignSelf: 'flex-start',
        marginTop: 20,
    },

    data: {
        alignContent: "center",
        marginBottom: 30
    },

    header: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        width: '50%',
        height: 40,
        backgroundColor: 'white',
        color: 'black',
        fontSize: 15,
        borderRadius: 10,
        marginTop: 25,
        alignSelf: 'center',
    },

    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },
    buttonHeader: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      maxHeight: 50,
      marginBottom: 10
    }

});

export default styles;