import React, {Component} from 'react';
import {View, Image} from 'react-native';

// importing styles
import styles from './styles';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {card} = this.props;

    return (
      <View style={[styles.card]}>
        <Image source={{uri: card}} style={styles.cardImage} />
      </View>
    );
  }
}

export default Card;
