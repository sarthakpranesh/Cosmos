import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        flex: 0.8,
        borderRadius: 8,
        shadowRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 0 },
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cardImage: {
        width: 200,
        flex: 1,
        resizeMode: 'contain'
    }
})