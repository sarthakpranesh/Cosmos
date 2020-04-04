import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar
} from 'react-native';
import { Feather } from '@expo/vector-icons'

// importing styles
import styles from './styles';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state={
            
        }
    }

    render() {
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
                        <Feather name="user" size={24} style={styles.headerIcon}/>
                        <Text>Username</Text>
                    </View>
                    <Feather name="inbox" size={24} style={styles.headerIcon}/>
                </View>
            </>
        );
    }
}

export default Header;