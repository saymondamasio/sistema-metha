import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  camera: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 24
  },
  messageStyle: {
    fontSize: 16
  },
  confirmButtonStyle: {
    width: 90,
    alignItems: 'center'
  },
  ButtonCodigo: {
    backgroundColor: '#2c3b76',
    width: '35%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20
  },
  ViewCodigo: {
    alignItems: 'center',
    bottom: 50
  },
  Input: {
    height: 60, 
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 30,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: '#f1f4fb'
  },
  contentContainerStyle: {
    width: 350
  },

});
  