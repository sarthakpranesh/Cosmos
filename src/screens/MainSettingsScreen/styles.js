import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        display: "flex",

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        paddingTop: 60,
    },
    userImage: {
        height: 100,
        width: 100,
        borderRadius: 50,

        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowColor: '#000'
    },
    userValueInput: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        alignSelf: 'center',
        paddingTop: 40,
    },
    textInput: {
        height: 40,
        width: Dimensions.get('window').width - 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,

        fontSize: 16
    },
    btn: {
        width: Dimensions.get('window').width - 50,
        marginTop: 20,
    }
})