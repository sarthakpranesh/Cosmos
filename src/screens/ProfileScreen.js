import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

// importing Firebase utils
import {getUserObject} from '../utils/firebase';

// importing global styles
import Styles from '../Styles';

// importing components
import Header from '../components/Header';
import LoadingIndicator from '../components/LoadingIndicator';

// importing firebase
import * as firebase from 'firebase';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser,
      posts: null,
    };
  }

  componentDidMount() {
    const {user} = this.state;
    if (!user.displayName) {
      this.props.navigation.navigate('userStartingStack');
      return;
    }
    this.props.navigation.addListener('willFocus', (payload) => {
      this.getUserPosts();
      this.setState({
        user: firebase.auth().currentUser,
      });
    });
    return;
  }

  getUserPosts = () => {
    const {user} = this.state;
    getUserObject(user.uid)
      .then((user) => {
        this.setState({
          posts: user.posts.reverse(),
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  renderPosts = () => {
    const {posts} = this.state;
    return (
      <View style={styles.postContainer}>
        {posts.map((i, index) => {
          return (
            <Image
              key={i.pid}
              source={{uri: i.downloadURL}}
              style={styles.postImageCard}
            />
          );
        })}
      </View>
    );
  };

  render() {
    const {user, posts} = this.state;

    if (!posts) {
      return <LoadingIndicator />;
    }

    return (
      <>
        <Header navigate={this.props.navigation.navigate} />
        <View style={styles.fixedTopHeader}>
          <Image
            source={require('../../assets/bg.jpg')}
            alt="User Image"
            style={styles.userImage}
          />
          <Text style={[styles.headerUsername]}>{user.displayName}</Text>
          <View style={styles.fixedTopHeaderInnerSection}>
            <View style={styles.fixedTopHeaderCards}>
              <Text>{posts.length}</Text>
              <Text style={Styles.textSmall}>POSTS</Text>
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text>123</Text>
              <Text style={Styles.textSmall}>LIKES</Text>
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text>123</Text>
              <Text style={Styles.textSmall}>NOPES</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollBottomView} onScrollAnimationEnd>
          {this.renderPosts()}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  fixedTopHeader: {
    height: SCREEN_HEIGHT / 3,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#fff',
    paddingTop: 10,
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,

    shadowOffset: {width: 1, height: 10},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowColor: '#000',
  },
  headerUsername: {
    marginTop: 10,
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  fixedTopHeaderInnerSection: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 9,
    margin: 0,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    paddingHorizontal: 60,
  },
  fixedTopHeaderCards: {
    height: SCREEN_HEIGHT / 9,
    width: SCREEN_WIDTH / 3 - 40,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollBottomView: {
    height: (2 * SCREEN_HEIGHT) / 3,
    backgroundColor: '#fff',
  },
  postContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postImageCard: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
    borderColor: '#000',
    borderWidth: 0.2,
  },
});

export default ProfileScreen;
