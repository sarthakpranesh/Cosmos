/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-deck-swiper';

// importing components
import Card from '../components/Cards';
import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';

// importing firebase
import * as firebase from 'firebase';

// importing utils
import {getActivePosts} from '../utils/apiFunctions';

const {width, height} = Dimensions.get('window');

const Users = [
  {
    id: '1',
    Image: require('../../assets/bg.jpg'),
    price: '32432',
    name: 'sefeife',
  },
];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isLoading: true,
      user: firebase.auth().currentUser,
    };
  }

  async componentDidMount() {
    const {user} = this.state;
    if (!user.displayName) {
      this.props.navigation.navigate('userStartingStack');
      return;
    }
    this.props.navigation.addListener('willFocus', (payLoad) => {
      this.setState({
        user: firebase.auth().currentUser,
      });
    });
    this.loadPosts();
    return;
  }

  loadPosts = () => {
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
          posts: Users,
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

  render() {
    const {user, isLoading, posts} = this.state;

    if (isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <>
        <Header
          username={user.displayName}
          uid={user.uid}
          navigate={this.props.navigation.navigate}
        />
        <View style={styles.mainContainer}>
          <Swiper
            cards={posts}
            cardIndex={this.state.index}
            keyExtractor={(card) => card.pid}
            renderCard={(card) => <Card card={card.downloadURL} />}
            stackSize={3}
            stackScale={10}
            stackSeparation={25}
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
            onSwipedRight={(cardIndex) => null}
            onSwipedLeft={(cardIndex) => null}
            onSwipedAll={this.onSwipedAll}
            backgroundColor={'white'}
            horizontalThreshold={width / 2}
            swipeAnimationDuration={500}
            animateCardOpacity={true}
            animateOverlayLabelsOpacity={false}
            marginTop={0}
            cardHorizontalMargin={10}
            childrenOnTop={true}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
