import React, {Component} from 'react';
import {View, Text} from 'react-native';

// importing components
import CacheImage from '../CacheImage';

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
        <Text style={styles.cardText}>{this.props.name}</Text>
        <CacheImage uri={card} style={styles.cardImage} />
      </View>
    );
  }
}

export default Card;
