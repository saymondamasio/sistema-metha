import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#d5def2',  
      padding: 10,
      flexDirection: 'column',
    },
    ButtonBack:{
      display: 'flex',
      flexDirection: 'row',
      width: '50%',
      alignItems: 'center',
      padding: 5,
    },
    ButtonOpt: {
      backgroundColor: '#2c3b76',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textbutton: {
      color: '#FFF',
      fontSize: 30,
      textShadowColor:'black',
      textShadowOffset:{width: 1, height: 1},
      textShadowRadius:10,
      zIndex: 10
    },
    line: {
      position: 'relative',
      width: '100%',
      flexDirection: 'row',
      height: '25%',
    },
    LogoImg1: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      resizeMode: 'contain'
    },
    LogoImg2: {
      width: '90%',
      height: '90%',
      position: 'absolute',
      resizeMode: 'contain'
    }
});