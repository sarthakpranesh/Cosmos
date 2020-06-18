import {StyleSheet, Dimensions} from 'react-native';
import {DarkTheme} from 'react-native-paper';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  postContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: DarkTheme.colors.background,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    zIndex: 100,
    left: width / 2 - 12 - 1,
    backgroundColor: DarkTheme.colors.primary,
    borderRadius: 50,
    padding: 2,
  },
  postImage: {
    ...StyleSheet.absoluteFill,
  },
  postTextContainer: {
    ...StyleSheet.absoluteFill,
    paddingHorizontal: 10,
    top: 0,
    alignSelf: 'center',
  },
  innerContentContainer: {
    top: 40,
    paddingVertical: height / 3,
  },
  postText: {
    color: DarkTheme.colors.notification,
    textAlign: 'justify',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  mainHeader: {
    marginTop: height / 3,
  },
});
