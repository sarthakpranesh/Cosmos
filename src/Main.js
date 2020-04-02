import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Style
} from 'react-native';

// importing local db
import { delUserDataAsync, getUserDataAsync } from './utils/localDb';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state ={
            user: null,
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

    render() {
        const { user } = this.state;

        return (
            <View>
                {
                    user
                    ?
                    <Text style={{marginTop: 100}}>
                        User: {user.name}
                    </Text>
                    :
                    null
                }
                <Button
                    title='Sign Out'
                    onPress={async () => {
                        console.log("pressed")
                        await delUserDataAsync(this.state.user);
                        this.props.navigation.navigate("UserStarting")
                    }}
                />
            </View>
        );
    }
}

export default Main;
