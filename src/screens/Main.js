import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';

// importing components
import Card from '../components/Cards';
import Header from '../components/Header'

const Users = [
    {id: '1', Image: require("../../assets/bg.jpg"), price: '32432', name: 'sefeife'},
    {id: '2', Image: require("../../assets/bg.jpg"), price: '23432', name: 'sefeife'},
    {id: '3', Image: require("../../assets/bg.jpg"), price: '23432', name: 'sefeife'},
    {id: '4', Image: require("../../assets/bg.jpg"), price: '23432', name: 'sefeife'},
    {id: '5', Image: require("../../assets/bg.jpg"), price: '23432', name: 'sefeife'}
]

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

// importing local db
import { delUserDataAsync, getUserDataAsync } from '../utils/localDb';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state={
            index: 0,
            user: null,
        }
    }

    UNSAFE_componentWillMount() {
        const user = this.props.navigation.getParam('user')
        this.setState({
            user
        })
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
                        onTapCard={(cardIndex) => console.log("Card Was Taped")}
                        onSwipedRight={(cardIndex) => console.log(cardIndex)}
                        onSwipedLeft={(cardIndex) => console.log(cardIndex)}
                        onSwipedAll={() => console.log("All cards swiped")}
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
        justifyContent: 'center'
    },
})

export default Main;
