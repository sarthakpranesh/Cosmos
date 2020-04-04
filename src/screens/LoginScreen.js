import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import { State, TapGestureHandler } from 'react-native-gesture-handler';

// importing common styles
import Styles from '../Styles';

// importing firebase
import * as firebase from 'firebase';

// importing Local Db
import { storeUserDataAsync, getUserDataAsync } from '../utils/localDb';

// importing firebase functions
import { addUserToDB, getUserObject } from "../utils/firebase";

const { width, height } = Dimensions.get('window');
const {
    Value,
    event,
    cond,
    eq,
    set,
    block,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0)
    };
  
    const config = {
      duration: 1000,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease)
    };
  
    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]),
      timing(clock, state, config),
      cond(state.finished, debug('stop clock', stopClock(clock))),
      state.position
    ]);
  }

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.buttonOpacity = new Value(1)

        this.onStateChange = event([
            {
                nativeEvent: ({ state }) => block([
                    cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(),1,0)))
                ])
            }
        ])

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) => block([
                    cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(),0,1)))
                ])
            }
        ])

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0,1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        })

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0,1],
            outputRange: [-height/3, 0],
            extrapolate: Extrapolate.CLAMP
        })

        this.textInputZIndex = interpolate(this.buttonOpacity, {
            inputRange: [0,1],
            outputRange: [1,-1],
            extrapolate: Extrapolate.CLAMP
        })

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0,1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        })

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        })

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        })

        this.state = {
            email: '',
            password: '',
            name: '',
            authMethod: '',
        }

        this.emailInput = null
        this.passwordInput = null
        this.nameInput = null

        this.user = null

        this.context = null
    }

    setEmail = (userEmail) => {
        if (userEmail === '') {
            this.setState({ email: '' });
        }
        this.setState({ email: userEmail });
    }

    setPassword = (userPassword) => {
        if (userPassword === '') {
            this.setState({ password: '' });
        }
        this.setState({ password: userPassword });
    }

    setName = (username) => {
        if(username === '') {
            this.setState({ name: '' });
        }
        this.setState({ name: username });
    }

    onSubmit = () => {
        if (this.state.authMethod === 'sign_up') {
            this.onSubmitSignUp()
        }

        if (this.state.authMethod === 'sign_in') {
            this.onSubmitSignIn()
        }   
    }

    onSubmitSignIn = () => {
        const { email, password } = this.state;
        if (!email) {
            Alert.alert(
                'Invalid Credentials',
                'Please Provide an Email!',
                [
                    { text: 'ok', onPress: () => this.emailInput.focus() }
                ]
            )
            return;
        }

        if (!password || password.length > 40 || password.length <6) {
            Alert.alert(
                'Invalid Credentials',
                'Please make sure your password is in the range of 6 to 40 characters!',
                [
                    { text: 'ok', onPress: () => this.passwordInput.focus() }
                ]
            )
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (userObject) => {
            const user = await getUserObject(userObject.user.uid);
            const tmp = await storeUserDataAsync(user);
            console.log(tmp)
            console.log(user);
            this.props.navigation.navigate("Main", { user });
        })
        .catch(function(error) {
            console.log(error);
            Alert.alert(
                'Problem logging In',
                error.message,
                [
                    { text: 'ok' }
                ]
            )
            return;
        })
    }

    onSubmitSignUp = () => {
        const { email, password, name } = this.state;
        if (!email) {
            Alert.alert(
                'Invalid Credentials',
                'Please Provide an Email!',
                [
                    { text: 'ok', onPress: () => this.emailInput.focus() }
                ]
            )
            return;
        }

        if (!password || password.length > 40 || password.length < 6) {
            Alert.alert(
                'Invalid Credentials',
                'Please make sure your password is in the range of 6 to 40 characters!',
                [
                    { text: 'ok', onPress: () => this.passwordInput.focus() }
                ]
            )
            return;
        }

        if (!name || name.length > 40 || name.length < 6) {
            Alert.alert(
                'Invalid Credentials',
                'Please make sure your username is in the range of 6 to 40 characters!',
                [
                    { text: 'ok', onPress: () => this.nameInput.focus() }
                ]
            )
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (userObject) => {
                var user = {
                    username: userObject.user.displayName ? userObject.user.displayName : name,
                    name: name,
                    email: userObject.user.email,
                    isEmailVerified: userObject.user.emailVerified,
                    phoneNumber: userObject.user.phoneNumber ? userObject.user.phoneNumber : false,
                    photoUrl: userObject.user.photoUrl ? userObject.user.photoURL : false,
                    uid: userObject.user.uid
                }
                await addUserToDB(user);
                await storeUserDataAsync(user);
                this.props.navigation.navigate("Main", { user });
            })
            .catch(function(error) {
                console.log(error.message)
                Alert.alert(
                    'User Exists',
                    'User with that Email already exists! Try Login instead',
                    [
                        { text: 'ok' }
                    ]
                )
            })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={"height"}>

                {/* Animated background View */}
                <Animated.View
                    style={[styles.innerContainer, {
                        transform: [{ translateY: this.bgY }]
                    }]}
                >
                    <Svg height={height} width={width}>
                        <ClipPath id="clip">
                            <Circle r={height} cx={width/2} />
                        </ClipPath>
                        <Image
                            href={require("../../assets/bg.jpg")}
                            width={width}
                            height={height}
                            preserveAspectRatio='xMidyMid slice'
                            clipPath='url(#clip)'
                        />
                    </Svg>
                </Animated.View>
                
                {/* Different Login Options */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPressIn={() => this.setState({ authMethod: 'sign_in' })}
                    >
                        <TapGestureHandler
                            onHandlerStateChange={this.onStateChange}
                        >
                            <Animated.View
                                style={[Styles.buttonLogin, {
                                    opacity: this.buttonOpacity,
                                    transform: [{ translateY: this.buttonY }]
                                }]}
                                
                            >
                                <Text style={styles.btnText}>SIGN IN</Text>
                            </Animated.View>
                        </TapGestureHandler>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPressIn={() => this.setState({ authMethod: 'sign_up' })}
                    >
                        <TapGestureHandler
                            onHandlerStateChange={this.onStateChange}
                        >
                            <Animated.View
                                style={[Styles.buttonLogin, {
                                    backgroundColor: '#2e71dc',
                                    opacity: this.buttonOpacity,
                                    transform: [{ translateY: this.buttonY }]
                                }]}
                                
                            >
                                <Text style={[styles.btnText, { color: 'white' }]}>SIGN UP</Text>
                            </Animated.View>
                        </TapGestureHandler>
                    </TouchableOpacity>
                </View>

                {/* Sign In Hidden Component */}
                <Animated.View
                    style={[ styles.hiddenContainer, {
                        zIndex: this.textInputZIndex,
                        opacity: this.textInputOpacity,
                        transform: [{ translateY: this.textInputY }]
                    },
                    this.state.authMethod === 'sign_up' ? { height: height/3 + 60 } : null,
                    ]}
                >
                    <TapGestureHandler
                        onHandlerStateChange={this.onCloseState}
                    >
                        <Animated.View
                            style={[ styles.closeBtn, Styles.buttonShadow ]}
                        >
                            <Animated.Text
                                style={{
                                    fontSize: 15,
                                    transform: [{
                                        rotate: concat(this.rotateCross, 'deg'),
                                    }]
                                }}
                            >
                                X
                            </Animated.Text>
                        </Animated.View>
                    </TapGestureHandler>
                    {
                        this.state.authMethod === 'sign_up'
                        ?
                        <TextInput
                            ref={(input) => { this.nameInput = input; }}
                            placeholder="Name"
                            style={styles.textInput}
                            placeholderTextColor="black"
                            onChangeText={(name) => this.setName(name)}
                            value={this.state.name}
                        />
                        :
                        null
                    }
                    <TextInput
                        ref={(input) => { this.emailInput = input; }}
                        placeholder="Email"
                        style={styles.textInput}
                        placeholderTextColor="black"
                        onChangeText={(email) => this.setEmail(email)}
                        value={this.state.email}
                    />
                    <TextInput
                        ref={(input) => { this.passwordInput = input; }}
                        placeholder="PASSWORD"
                        style={styles.textInput}
                        placeholderTextColor="black"
                        onChangeText={(password) => this.setPassword(password)}
                        value={this.state.password}
                    />

                    <TouchableOpacity 
                        onPress={this.onSubmit}
                    >
                        <Animated.View style={[ Styles.buttonLogin, Styles.buttonShadow ]}>
                            <Text style={[ Styles.textSmallBold ]}>
                                {
                                    this.state.authMethod === 'sign_up'
                                    ?
                                    "Sign Up"
                                    :
                                    "Sign In"
                                }
                            </Text>
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
    },
    innerContainer: {
        ...StyleSheet.absoluteFill,
    },
    bgImage: {
        flex: 1,
        height: null,
        width: null
    },
    buttonContainer: {
        height: height/3,
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    hiddenContainer: {
        height: height/3,
        ...StyleSheet.absoluteFill,
        top: null,
        justifyContent: 'flex-end',
        backgroundColor: 'white'
    },
    closeBtn: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width/2 - 20,
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
})

export default LoginScreen;