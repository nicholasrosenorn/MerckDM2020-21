
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6ed0d4',
        alignItems: "center"
    },

    merckpic: {
        width: '60%',
        height: '20%',
        marginTop: 20,

    },

    data: {
        alignContent: "center",
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
    }

});

export default styles;