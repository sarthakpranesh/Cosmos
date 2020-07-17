import {StyleSheet, Dimensions} from 'react-native';
import {DarkTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  settingContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
    paddingHorizontal: 16,
  },
  userImage: {
    height: width * 0.25,
    width: width * 0.25,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  inputChangeContainer: {
    marginVertical: 10,
  },
  inAppTextInput: {
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: DarkTheme.colors.background,
  },
  btnWrapper: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
