import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

// importing components
import Header from '../../components/Header';

// importing styles
import Styles from '../../Styles';

class PostViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
    };
  }

  render() {
    return (
      <>
        <Header />
        <View style={Styles.containerStarting}>
          <Text>djvnfdbvjbfdj</Text>
        </View>
      </>
    );
  }
}

export default PostViewScreen;
