import {StyleSheet, Dimensions} from 'react-native';
import {DarkTheme} from 'react-native-paper';

export default StyleSheet.create({
  landingContainer: {
    flex: 1,
    backgroundColor: DarkTheme.colors.background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  headerTextContainer: {
    marginTop: Dimensions.get('screen').height / 4,
  },
  subHeaderTextContainer: {
    marginTop: 40,
  },
  subHeaderText: {
    textAlign: 'justify',
    fontSize: 16 * Dimensions.get('screen').fontScale,
  },
  googleBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});
