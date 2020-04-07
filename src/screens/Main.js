import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Swiper from 'react-native-deck-swiper';

// importing components
import Card from '../components/Cards';
import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';

// importing firebase
import * as firebase from 'firebase';

// importing firebase utils
import {getUserObject} from '../utils/firebase';

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
      user: null,
      isLoading: true,
    };
  }

  async UNSAFE_componentWillMount() {
    const uid = firebase.auth().currentUser.uid;
    if (!uid) {
      this.props.navigation.navigate('userStartingStack');
      return;
    }
    const user = await getUserObject(uid);
    this.setState({
      user: user,
    });
    this.setState({
      isLoading: false,
    });
  }

  onSwiped = () => {
    const {index} = this.state;
    this.setState({
      index: (index + 1) % Users.length,
    });
  };

  render() {
    const {user} = this.state;

    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <>
        <Header
          username={user.username}
          uid={user.uid}
          navigate={this.props.navigation.navigate}
        />
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
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 20,
                    paddingRight: 20,
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
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 20,
                    paddingLeft: 20,
                  },
                },
              },
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            infinite
            onTapCard={(cardIndex) => console.log('Card Was Taped')}
            onSwipedRight={(cardIndex) => console.log(cardIndex)}
            onSwipedLeft={(cardIndex) => console.log(cardIndex)}
            onSwipedAll={() => console.log('All cards swiped')}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
