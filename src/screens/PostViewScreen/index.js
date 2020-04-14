import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// importing components
import Header from '../../components/Header';
import CloseIcon from '../../components/icons/CloseIcon';

// importing styles
import Styles from '../../Styles';

class PostViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
      card: this.props.navigation.getParam('card'),
    };
  }

  render() {
    const {card} = this.state;
    console.log(card);
    return (
      <>
        <Header />
        <View style={Styles.containerStarting}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default PostViewScreen;
