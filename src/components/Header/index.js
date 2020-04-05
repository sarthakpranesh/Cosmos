import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'

// importing styles
import styles from './styles';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state={
            username: props.username ? props.username : 'User1234',
            uid: props.uid ? props.uid : 'gfVVMvXZ3DQgHOZ4cc6coD50Pys1',
        }
    }

    goToScreen = (screen) => {
        const { navigate } = this.props;
        const { username, uid } = this.state;
        if (username === 'Profile') {
            navigate("Main");
            return
        }
        navigate(screen, { uid })
    }

    render() {
        const { username, uid } = this.state;
        return (
            <>
                <StatusBar
                    animated={true}
                    backgroundColor={'green'}
                    barStyle={'light-content'}
                    networkActivityIndicatorVisible={false}
                    translucent={false}
                />
                <View style={styles.headerWrapper}>
                    <View style={styles.innerContainer}>
                        <TouchableOpacity
                            onPress={() => this.goToScreen("ProfileScreen")}
                        >
                            {
                                this.state.username === 'Profile'
                                ?
                                <Ionicons name='ios-arrow-back' size={24} style={styles.headerIcon}/>
                                :
                                <Feather name='user' size={24} style={styles.headerIcon}/>
                            }
                        </TouchableOpacity>
                        <Text>{ username }</Text>
                    </View>
                    {
                        this.state.username === 'Profile'
                        ?
                        null
                        :
                        <TouchableOpacity
                            onPress={() => this.goToScreen("NotificationScreen")}
                        >
                            <Feather name="inbox" size={24} style={styles.headerIcon}/>
                        </TouchableOpacity>
                    }
                </View>
            </>
        );
    }
}

export default Header;