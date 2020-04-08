/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Swiper from 'react-native-deck-swiper';

// importing components
import Card from '../components/Cards';
import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';

// importing firebase
import * as firebase from 'firebase';

const Users = [
  {
    id: '1',
    Image: require('../../assets/bg.jpg'),
    price: '32432',
    name: 'sefeife',
  },
  {
    id: '2',
    Image: require('../../assets/bg.jpg'),
    price: '23432',
    name: 'sefeife',
  },
  {
    id: '3',
    Image: require('../../assets/bg.jpg'),
    price: '23432',
    name: 'sefeife',
  },
  {
    id: '4',
    Image: require('../../assets/bg.jpg'),
    price: '23432',
    name: 'sefeife',
  },
  {
    id: '5',
    Image: require('../../assets/bg.jpg'),
    price: '23432',
    name: 'sefeife',
  },
];

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isLoading: false,
      user: firebase.auth().currentUser,
    };
  }

  UNSAFE_componentWillMount() {
    const {user} = this.state;
    if (!user.displayName) {
      this.props.navigation.navigate('userStartingStack');
      return;
    }
    return;
  }

  onSwiped = () => {
    const {index} = this.state;
    this.setState({
      index: (index + 1) % Users.length,
    });
  };

  render() {
    const {user} = this.state;

    return (
      <>
        <Header
          username={user.displayName}
          uid={user.uid}
          navigate={this.props.navigation.navigate}
        />
        {this.state.isLoading ? (
          <LoadingIndicator />
        ) : (
          <View style={styles.mainContainer}>
            <Swiper
              cards={Users}
              cardIndex={this.state.index}
              keyExtractor={(card) => card.id}
              renderCard={(card) => <Card card={card} />}
              onSwiped={this.onSwiped}
              stackSize={4}
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
              animateCardOpacity
              infinite
              onTapCard={(cardIndex) => console.log('Card Was Taped')}
              onSwipedRight={(cardIndex) => console.log(cardIndex)}
              onSwipedLeft={(cardIndex) => console.log(cardIndex)}
              onSwipedAll={() => console.log('All cards swiped')}
              backgroundColor={'white'}
            />
          </View>
        )}
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
