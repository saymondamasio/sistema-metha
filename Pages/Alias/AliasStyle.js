import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    Input: {
        height: 60, 
        width: '80%',
        top: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        fontSize: 30,
        paddingLeft: 20,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonNext: {
        backgroundColor: '#2c3b76',
        borderRadius: 20,
        width: "70%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: '5%'
    },
    textbutton: {
        color: '#FFF',
        fontSize: 20
    }
});
  