import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

// importing styles
import styles from './styles';

// importing components
import Header from '../../components/Header';

class MainSettings extends Component {
    constructor(props) {
        super(props)
        console.log(props);
    }

    render() {
        const { navigation } = this.props;
        return (
            <>
            <Header
                username='Settings'
                navigate={navigation.navigate}
            />
            <View>
                <Text>
                    Settings page
                </Text>
            </View>
            </>
        );
    }
}

export default MainSettings;
