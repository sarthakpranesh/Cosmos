import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: 60,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerIcon: {
    padding: 16,
  },
});
