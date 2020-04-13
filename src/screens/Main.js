/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Swiper from 'react-native-deck-swiper';

// importing components
import Card from '../components/Cards';
import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';

// importing firebase
import * as firebase from 'firebase';

// importing utils
import {getActivePosts, likePost, nopePost} from '../utils/apiFunctions';
import Styles from '../Styles';

// importing colors for default theme
import {colors} from '../Constants';

const {width, height} = Dimensions.get('window');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isLoading: true,
      user: firebase.auth().currentUser,
      posts: [],
    };
  }

  async componentDidMount() {
    const {user, posts} = this.state;
    if (!user.displayName) {
      this.props.navigation.navigate('userStartingStack');
      return;
    }
    this.props.navigation.addListener('willFocus', (payLoad) => {
      if (posts.length === 0) {
        this.setState({
          user: firebase.auth().currentUser,
          isLoading: true,
        });
        this.loadPosts();
      }
      this.setState({
        user: firebase.auth().currentUser,
      });
    });
    this.loadPosts();
    return;
  }

  loadPosts = async () => {
    getActivePosts()
      .then((posts) => {
        this.setState({
          posts,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          posts: [],
          isLoading: false,
        });
      });
  };

  onSwipedAll = async (i) => {
    this.setState({
      isLoading: true,
    });
    this.loadPosts();
  };

  renderCard = () => {
    const {isLoading, posts} = this.state;

    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (posts.length === 0) {
      return (
        <Text
          style={[
            Styles.textMedium,
            {
              flexWrap: 'wrap',
              textAlign: 'center',
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
        onTapCard={(cardIndex) => null}
        onSwipedRight={(cardIndex) => likePost(posts[cardIndex].pid)}
        onSwipedLeft={(cardIndex) => nopePost(posts[cardIndex].pid)}
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
    return (
      <>
        <Header />
        <View style={styles.mainContainer}>{this.renderCard()}</View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.darkTheme.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
