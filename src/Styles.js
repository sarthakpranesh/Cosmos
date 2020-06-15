import {StyleSheet, Dimensions} from 'react-native';
import {DarkTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

const Styles = StyleSheet.create({
  mainContainerBackgroundColor: {
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  containerLoginSign: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  containerStarting: {
    flex: 1,
    backgroundColor: 'black',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  landingImage: {
    position: 'absolute',
    height: height,
    width: width,
    zIndex: -100,
  },
  buttonLogin: {
    backgroundColor: DarkTheme.colors.primary,
    height: 48,
    width: width / 3,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonShadow: {
    shadowOffset: {width: 1, height: 1},
    shadowColor: DarkTheme.colors.primary,
    shadowOpacity: 0.8,
    elevation: 3,
  },
  textInput: {
    height: 50,
    borderRadius: 8,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  inAppTextInput: {
    height: 50,
    borderRadius: 8,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    color: 'white',
    backgroundColor: DarkTheme.colors.background,
  },
  textSmall: {
    fontFamily: '',
    fontSize: width / 24,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'normal',
  },
  textMedium: {
    fontFamily: '',
    fontSize: width / 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
  },
  textLarge: {
    fontFamily: '',
    fontSize: width / 14,
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
  },
});

export default Styles;
