import React from 'react';
import { View, Button, Text } from 'react-native';

import { AsyncStorage } from 'react-native';

export default class About extends React.Component {
  static navigationOptions = {
    title: 'About',
  };

  state = {
    token: null,
    user: null
  }

  async componentDidMount() {
    const tokenRegistered = await AsyncStorage.getItem('@tcc:token');
    const userRegistered = JSON.parse(await AsyncStorage.getItem('@tcc:user'));

    if (tokenRegistered) {
      this.setState({token: tokenRegistered, user: userRegistered});
    }

    if (!tokenRegistered)
      this.props.navigation.goBack();
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { !!this.state.user && <Text> { this.state.user.token } </Text> }
        { !!this.state.user && <Text> { this.state.user.nome } </Text> }
        { !!this.state.user && <Text> { this.state.user.email } </Text> }
        <Text>About</Text>
      </View>
    );
  }
}
