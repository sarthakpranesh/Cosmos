import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

// importing global styles
import Styles from "../Styles";

// importing components
import Header from "../components/Header";

class ProfileScreen extends Component {
    constructor(props){
        super(props)
    }

    render() {

        return (
            <>
            <Header 
                navigate={this.props.navigation.navigate}
                username='Profile'
            />
            <View>
                <Text>Hi from profile</Text>
            </View>
            </>
        );
    }
}

export default ProfileScreen;