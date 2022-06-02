import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: '100%'
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    LogoImg: {
        width: '100%',
        height: '30%',
        top: 30,
        resizeMode: 'contain',
        marginBottom: 20
    },
    Input: {
        height: 60, 
        width: '80%',
        top: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        fontSize: 30,
        paddingLeft: 20,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    ButtonNext: {
        backgroundColor: '#2c3b76',
        borderRadius: 20,
        width: "70%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: 40
    },
    ButtonAlias: {
        backgroundColor: '#2c3b76',
        borderRadius: 20,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: 30,
        marginRight: '-85%'
    },
    textbutton: {
        color: '#FFF',
        fontSize: 20
    },
    down: {
        alignItems: 'center',
    }   
});
