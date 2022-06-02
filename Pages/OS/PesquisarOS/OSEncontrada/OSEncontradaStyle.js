import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
		padding: 10
	},
	textMenu: {
		fontSize: 30,
		color: 'black',
		width: '100%',
		textAlign: 'center',
	},
	textMenu2: {
		fontSize: 20,
		color: 'black',
		width: '100%',
		textAlign: 'center',
		fontStyle: 'italic',
	},
	textMenu3: {
		color: 'black',
		width: '100%',
		textAlign: 'center',
		fontStyle: 'italic',
	},
	textMenu4: {
		color: '#FFF',
		width: '100%',
		backgroundColor: '#2c3b76',
		textAlign: 'center',
		fontStyle: 'italic',
	},
	box: {
		flex: 1,
		color: 'black',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		padding: 10,
		backgroundColor: '#FFF',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#2c3b76',
	},
	boxTop: {
		color: 'white', backgroundColor: '#2c3b76', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, paddingBottom: 0, borderBottomColor: 'transparent'
	},
	boxBottom: {
		borderTopColor: 'transparent', borderTopLeftRadius: 0, borderTopRightRadius: 0
	},
	TextLista: {
		color: '#FFF'
	},
	exec: {
		backgroundColor: '#2c3b76',
		borderTopRightRadius: 25,
		borderTopLeftRadius: 25,
		color: 'white',
		fontWeight: 'bold',
		padding: 2,
		fontSize: 20,
		textAlign: 'center',
		marginHorizontal: 10
	},
	layoutExec: {
		backgroundColor: '#2c3b76',
		color: 'white',
		fontWeight: 'bold',
		padding: 2,
		//textAlign: 'center',
		paddingLeft: 15,
		marginHorizontal: 10
	},
	layoutExecRow: {
		fontWeight: 'bold',
		padding: 2,
		paddingLeft: 10,
		marginHorizontal: 10
		//textAlign: 'center',
	},
	execAnimate: {
		backgroundColor: '#2c3b76',
		color: 'white',
		fontWeight: 'bold',
		paddingVertical: 20,
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 15,
		marginTop: 15,
		marginLeft: 50,
		borderRadius: 30,
		width:'80%',
	},
	updateData: {
		backgroundColor: 'green',
		color: 'white',
		fontWeight: 'bold',
		paddingVertical: 5,
		alignSelf: 'center',
		fontSize: 15,
		paddingHorizontal: 10,
		borderRadius: 10,
		textAlign: 'center',
		marginVertical: 5
	},
	saveBar: {
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
		alignItems: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		backgroundColor: 'transparent',
		shadowOpacity: 0,
		borderWidth: 0,
		elevation: 0,
		shadowOffset: {
			height: 0,
			width: 0
		},
		shadowRadius: 0,
		shadowColor: 'transparent',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		flex: 1,
		zIndex: 1
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	dates: {
		padding: 5,
		borderColor: '#000', maxWidth: 100, color: 'black',
		borderWidth: 1, borderRadius: 5, margin: 5,
		marginBottom: 15,
	}
});
