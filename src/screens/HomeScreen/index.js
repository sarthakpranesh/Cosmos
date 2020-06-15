/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import Swiper from 'react-native-deck-swiper';
import auth from '@react-native-firebase/auth';

// importing helper functions
import {getUserDetails} from '../../utils/firebase.js';

// importing components
import Card from '../../components/Cards';

import Styles from '../../Styles';

const {width} = Dimensions.get('window');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isLoading: false,
      user: auth().currentUser,
      posts: [],
    };
  }

  componentDidMount() {
    getUserDetails();
  }

  onSwipedAll = async (i) => {
    this.setState({
      isLoading: true,
    });
    this.loadPosts();
  };

  onTabCard = (cardIndex) => {
    const {posts} = this.state;
    this.props.navigation.navigate('PostViewScreen', {card: posts[cardIndex]});
  };

  renderCard = () => {
    const {isLoading, posts} = this.state;

    if (isLoading) {
      return <ActivityIndicator />;
    }

    if (posts.length === 0) {
      return (
        <Text
          style={[
            Styles.textMedium,
            {
              flexWrap: 'wrap',
              textAlign: 'center',
              marginHorizontal: 10,
            },
          ]}>
          Waiting For Someone to Upload Something Interesting 🎨
        </Text>
      );
    }

    return (
      <Swiper
        cards={posts}
        cardIndex={this.state.index}
        keyExtractor={(card) => card.pid}
        renderCard={(card) => <Card card={card.downloadURL} name={card.name} />}
        stackSize={3}
        stackScale={10}
        stackSeparation={35}
        disableTopSwipe
        disableBottomSwipe
        overlayLabels={{
          left: {
            title: 'Nope',
            style: {
              label: {
                backgroundColor: 'red',
                color: 'white',
                fontSize: 18,
                zIndex: 100,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                marginTop: 20,
                paddingRight: 20,
                position: 'absolute',
                zIndex: 100,
              },
            },
          },
          right: {
            title: 'Like',
            style: {
              label: {
                backgroundColor: 'green',
                color: 'white',
                fontSize: 18,
                zIndex: 100,
              },
              wrapper: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                marginTop: 20,
                paddingLeft: 20,
                zIndex: 100,
              },
            },
          },
        }}
        onTapCard={(cardIndex) => this.onTabCard(cardIndex)}
        onSwipedRight={(cardIndex) => console.log('swipped left')}
        onSwipedLeft={(cardIndex) => console.log('swipped left')}
        onSwipedAll={this.onSwipedAll}
        backgroundColor={colors.darkTheme.backgroundColor}
        horizontalThreshold={width / 2}
        swipeAnimationDuration={500}
        animateCardOpacity={true}
        animateOverlayLabelsOpacity={true}
        marginTop={0}
        cardHorizontalMargin={15}
        childrenOnTop={true}
      />
    );
  };

  render() {
    return <View style={styles.mainContainer}>{this.renderCard()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
