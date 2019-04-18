import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#394D7B',
    },
    button: {
        backgroundColor: '#FFF',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        color: '#000',
        fontSize: 12,
        overflow: 'hidden',
        padding: 10,
        textAlign:'center',
        fontFamily: 'Helvetica',
        width: 100,
        margin: 5,
    },
    inputText: {
        borderColor: '#FFF',
        borderBottomWidth: 1,
        color: '#FFF',
        height: 40,
    },
    successMessage: {
        backgroundColor: '#0A0',
        color: "#FFF",
        marginTop: 10,
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    erroMessage: {
        backgroundColor: '#A00',
        color: "#FFF",
        alignSelf: 'stretch',
        textAlign: 'center',
        justifyContent:'center',
    }
});