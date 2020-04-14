import {StyleSheet, Dimensions} from 'react-native';

// importing colors for default theme
import {colors} from '../../Constants';

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  postContainer: {
    backgroundColor: colors.darkTheme.backgroundColor,
    height: height - 60,
    width: width,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    zIndex: 100,
    left: width / 2 - 12 - 1,

    backgroundColor: colors.darkTheme.backgroundColor,
    borderRadius: 50,
    padding: 2,
  },
  postImage: {
    width: width,
    height: height - 60,
  },
  postTextContainer: {
    position: 'absolute',
    height: height,
    width: width - 20,
    paddingHorizontal: 10,
    top: 0,
  },
  innerContentContainer: {
    top: 40,
    paddingVertical: height / 3,
  },
  postText: {
    textAlign: 'justify',
    color: colors.darkTheme.secondaryText,
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    fontWeight: 'bold',
  },
  mainHeader: {
    marginTop: height / 3,
    fontSize: width / 10,
  },
});
