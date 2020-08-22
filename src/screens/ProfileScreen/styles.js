import {StyleSheet, Dimensions} from 'react-native';
import {DarkTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  profileContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'black',
  },
  fixedTopHeader: {
    height: height / 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DarkTheme.colors.background,
    paddingTop: 10,
  },
  fixedEditIcon: {
    position: 'absolute',
    right: 16,
    top: 10,
  },
  userImage: {
    height: width / 5,
    width: width / 5,
    borderRadius: 50,
  },
  fixedTopHeaderInnerSection: {
    width: width,
    height: height / 9,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  fixedTopHeaderCards: {
    height: height / 9,
    width: width / 3 - 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollBottomView: {
    height: (2 * height) / 3 - 60,
  },
  emptyPostContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyPostText: {
    flexWrap: 'wrap',
    textAlign: 'center',
    marginHorizontal: 10,
    opacity: 0.6,
  },
  postContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postImageCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: width / 3 - 0.8,
    height: width / 3 - 0.8,
    borderColor: 'black',
    borderWidth: 0.4,
  },
  noPostYetText: {
    flexWrap: 'wrap',
    textAlign: 'justify',
    marginTop: 10,
    marginHorizontal: 40,
    opacity: 0.6,
  },
});
