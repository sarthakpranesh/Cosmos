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
import CacheImage from '../components/CacheImage';

// importing firebase
import * as firebase from 'firebase';

// importing colors for default theme
import {colors} from '../Constants';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser,
      posts: [],
      like: 0,
      nope: 0,
      isLoading: true,
    };
  }

  componentDidMount() {
    const {user} = this.state;
    if (!user.displayName) {
      this.props.navigation.navigate('userStartingStack');
      return;
    }
    this.props.navigation.addListener('willFocus', (payload) => {
      this.setState({
        user: firebase.auth().currentUser,
        isLoading: true,
      });
      this.getUserPosts();
    });
    return;
  }

  getUserPosts = () => {
    const {user} = this.state;
    getUserObject(user.uid)
      .then((u) => {
        this.setState({
          posts: u.posts ? u.posts.reverse() : [],
          like: u.like ? u.like : 0,
          nope: u.nope ? u.nope : 0,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setState({
          isLoading: false,
        });
      });
  };

  renderPosts = () => {
    const {posts} = this.state;
    return (
      <View style={styles.postContainer}>
        {posts.map((i, index) => {
          return (
            <CacheImage
              key={i.pid}
              uri={i.downloadURL}
              style={styles.postImageCard}
            />
          );
        })}
      </View>
    );
  };

  render() {
    const {user, posts, isLoading} = this.state;

    if (isLoading) {
      return (
        <View
          style={[
            Styles.container,
            {backgroundColor: colors.darkTheme.backgroundColor},
          ]}>
          <LoadingIndicator />
        </View>
      );
    }

    return (
      <View style={{backgroundColor: colors.darkTheme.backgroundColor}}>
        <Header navigate={this.props.navigation.navigate} />
        <View style={styles.fixedTopHeader}>
          <Image
            source={require('../../assets/bg.jpg')}
            alt="User Image"
            style={styles.userImage}
          />
          <Text style={[Styles.textMedium, styles.headerUsername]}>
            {user.displayName}
          </Text>
          <View style={styles.fixedTopHeaderInnerSection}>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={styles.postResp}>{posts.length}</Text>
              <Text style={[Styles.textSmall, styles.postResp]}>Posts</Text>
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={styles.postResp}>{this.state.like}</Text>
              <Text style={[Styles.textSmall, styles.postResp]}>Likes</Text>
            </View>
            <View style={styles.fixedTopHeaderCards}>
              <Text style={styles.postResp}>{this.state.nope}</Text>
              <Text style={[Styles.textSmall, styles.postResp]}>Nopes</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.scrollBottomView} onScrollAnimationEnd>
          {this.renderPosts()}
        </ScrollView>
      </View>
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

    paddingTop: 10,
  },
  userImage: {
    height: SCREEN_WIDTH / 4,
    width: SCREEN_WIDTH / 4,
    borderRadius: 50,
  },
  headerUsername: {
    marginTop: 10,
    color: colors.darkTheme.secondaryText,
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
  postResp: {
    color: colors.darkTheme.secondaryText,
  },
  scrollBottomView: {
    height: (2 * SCREEN_HEIGHT) / 3 - 60,
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
