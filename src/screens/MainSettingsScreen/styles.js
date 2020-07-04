import {StyleSheet} from 'react-native';
import {DarkTheme} from 'react-native-paper';

export default StyleSheet.create({
  settingContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
    paddingHorizontal: 16,
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 40,
  },
  inputChangeContainer: {
    marginVertical: 10,
  },
  inAppTextInput: {
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 5,
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
