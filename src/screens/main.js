import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import defaultStyle from '../styles/defaultStyle.js';
import { AsyncStorage } from 'react-native';

export default class Main extends React.Component {
  static navigationOptions = {
    title: 'Main',
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

  notImplemented = async () => {
    alert("Função não implementada.");
  }

  signOut = async () => {
    await AsyncStorage.multiSet([
        ['@tcc:token', ''],
        ['@tcc:user', ''],
    ]);

    await this.props.navigation.navigate('Home');
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={[defaultStyle.container]}>

        { !!this.state.user && <Text style={styles.title}> Bem Vindo { this.state.user.nome }!</Text> }

        <TouchableOpacity onPress={this.notImplemented}>
            <Text style={[defaultStyle.button]}>Meus Cursos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.notImplemented}>
            <Text style={[defaultStyle.button]}>Cursos</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.notImplemented}>
            <Text style={[defaultStyle.button]}>Matricular</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.signOut}>
            <Text style={[defaultStyle.button]}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    title: {
      color: '#FFF',
      fontSize: 20,
      paddingBottom: 150,
    }
  });