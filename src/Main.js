import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import Animated from 'react-native-reanimated';
import Swiper from 'react-native-deck-swiper';

const Users = [
    {id: '1', Image: require("../assets/bg.jpg"), price: '32432', name: 'sefeife'},
    {id: '2', Image: require("../assets/bg.jpg"), price: '23432', name: 'sefeife'},
    {id: '3', Image: require("../assets/bg.jpg"), price: '23432', name: 'sefeife'},
    {id: '4', Image: require("../assets/bg.jpg"), price: '23432', name: 'sefeife'},
    {id: '5', Image: require("../assets/bg.jpg"), price: '23432', name: 'sefeife'}
]

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

// importing local db
import { delUserDataAsync, getUserDataAsync } from './utils/localDb';

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            card: props.card
        }
    }

    render() {
        const { card } = this.state;

        return (
            <View style={styles.card}>
                <Image
                    source={card.Image}
                    style={styles.cardImage}
                />
            </View>
        );
    }
}

class Main extends Component {
    constructor(props) {
        super(props)
        this.state ={
            user: null,
            index: 0,
        }
    }

    loadUser = async () => {
        const user = await getUserDataAsync();
        this.setState({ user })
    }

    componentDidMount() {
        const user = this.props.navigation.getParam('user');
        this.setState({ user })
    }

    onSwiped = () => {
        const { index } = this.state;
        this.setState({
            index: (index + 1) % Users.length
        })
    }

    render() {
        const { user } = this.state;

        return (
            <View style={styles.mainContainer}>
                <Swiper 
                    cards={Users}
                    cardIndex={this.state.index}
                    renderCard={(card) => <Card card={card} />}
                    onSwiped={this.onSwiped}
                    stackSize={4}
                    stackScale={10}
                    stackSeparation={25}
                    disableTopSwipe
                    disableBottomSwipe
                    overlayLabels={{
                        left: {
                            title: "Nope",
                            style: {
                                label:{
                                    backgroundColor: 'red',
                                    color: "white",
                                    fontSize: 18,
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start',
                                    marginTop: 20,
                                    paddingRight: 20,
                                }
                            }
                        },
                        right: {
                            title: "Like",
                            style: {
                                label:{
                                    backgroundColor: 'green',
                                    color: "white",
                                    fontSize: 18,
                                },
                                wrapper: {
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: 20,
                                    paddingLeft: 20,
                                }
                            }
                        },
                    }}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    infinite
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        flex: 0.8,
        borderRadius: 8,
        shadowRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 0 },
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cardImage: {
        width: 200,
        flex: 1,
        resizeMode: 'contain'
    }
})

export default Main;
