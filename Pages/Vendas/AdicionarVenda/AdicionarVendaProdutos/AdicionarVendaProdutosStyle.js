import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#d5def2', 
        padding: 20
    },
    Input: {
        position:'relative',
        height: 60, 
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        paddingLeft: 20,
        top: 10,
        marginBottom: 20,
        backgroundColor: '#f1f4fb',
        color: "black"
    },
    select: {
      position:'relative',
      color: 'white',
      width:'100%',
      height: 30,
      backgroundColor: '#2c3b76',
    },
    nomePesquisar: {
        height: 60, 
        width: "100%",
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        paddingLeft: 20,
        paddingRight: 70,
        marginBottom: 20,
        backgroundColor: '#f1f4fb',
        color: 'black',
        position: 'absolute'
    },
    selectPop: {
        position:'relative',
        color: 'white',
        height: 30,
        backgroundColor: '#2c3b76',
    },
    listaPop: {
        borderWidth: 2,
        borderColor: "#2c3b76",
        padding: 3,
    },
    ViewNextAdd: {
        flexDirection: 'row-reverse',
        marginRight: 15,
        alignItems: 'center',
        marginTop: 30,
    },
    ViewNextVolt: {
        height: 60,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 50,

    },
    ButtonNext: {
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3b76',
    },
    TextNext: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        padding: 1,
        paddingHorizontal: 10,
    },
    ButtonPessoa: {
        backgroundColor: '#2c3b76',
        position: 'absolute',
        width: 50,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    InputM: {
        position:'relative',
        height: 60, 
        width: '50%',
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        paddingLeft: 20,
        top: 10,
        marginBottom: 20,
        backgroundColor: '#f1f4fb',
        color: "black"
    },
    selectFisJur: {
        position:'relative',
        color: 'white',
        width:'100%',
        height: 30,
        backgroundColor: '#2c3b76',
        marginBottom: 5
    },
    InputMemo: {
        position:'relative',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 20,
        padding: 12,
        paddingLeft: 20,
        top: 10,
        marginBottom: 20,
        backgroundColor: '#f1f4fb',
        color: "black",
        textAlign: 'left',
        textAlignVertical: "top"
    },
    TextValor: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2c3b76',
        textAlign: 'right'
    },
    TextTroca: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3b76',
        textAlign: 'right'
    }
});