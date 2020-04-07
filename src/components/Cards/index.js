import React, {Component} from 'react';
import {View, Image} from 'react-native';

// importing styles
import styles from './styles';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: props.card,
    };
  }

  render() {
    const {card} = this.state;

    return (
      <View style={styles.card}>
        <Image source={card.Image} style={styles.cardImage} />
      </View>
    );
  }
}

export default Card;
