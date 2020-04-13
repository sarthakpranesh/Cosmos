import {StyleSheet} from 'react-native';

// importing colors for default theme
import {colors} from '../../Constants';

export default StyleSheet.create({
  card: {
    flex: 0.84,
    borderRadius: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.darkTheme.backgroundColor,

    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 8,
  },
  cardImage: {
    width: '96%',
    flex: 0.9,
    resizeMode: 'cover',
    marginBottom: 6,
    borderRadius: 8,
  },
  cardText: {
    color: colors.darkTheme.secondaryText,
    fontSize: 20,
    marginBottom: 5,
  },
});
