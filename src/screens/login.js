import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, TextInput } from 'react-native';

import defaultStyle from '../styles/defaultStyle.js';
import CustomInputText from '../styles/customInputText.js';

import { AsyncStorage } from 'react-native';

import api from '../services/api.js'


export default class Login extends React.Component {
    static navigationOptions = {
      title: 'Login',
    };

    state = {
        errorMessage: null,
        successMessage: null,
        email: null,
        senha: null,
    }

    signIn = async () => {
        try {
            this.setState({ errorMessage: null, successMessage: null });

            const param = {
                params: {
                    email: this.state.email,
                    senha: this.state.senha,
               }
            }
            const response = await api.get('/autenticar/', {}, param);

            const { user, token } = response.data;

            await AsyncStorage.multiSet([
                ['@tcc:token', token],
                ['@tcc:user', JSON.stringify(user)],
            ]);

            this.setState({ successMessage: 'Encontrado.', errorMessage: null });
            await this.props.navigation.navigate('Main');
        }catch (response) {
            this.setState({ errorMessage: response.data.errorMessage, successMessage: null });
            await AsyncStorage.multiSet([
                ['@tcc:token', ''],
                ['@tcc:user', ''],
            ]);
        }
    }
  
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={defaultStyle.container}>
            { this.state.errorMessage && <Text style={defaultStyle.erroMessage}>{ this.state.errorMessage } </Text> }
            
            <CustomInputText style={{width: 200}} placeholder="e-mail"  onChangeText={(email) => this.setState({email})}/>
            <CustomInputText style={{width: 200}} placeholder="senha" secureTextEntry={true} onChangeText={(senha) => this.setState({senha})}/>

            <TouchableOpacity onPress={this.signIn}>
                <Text style={defaultStyle.button}>Entrar</Text>
            </TouchableOpacity>

            { this.state.successMessage && <Text style={defaultStyle.successMessage} >{ this.state.successMessage } </Text> }
        </View>
      );
    }
  }