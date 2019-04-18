import React from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import defaultStyle from '../styles/defaultStyle.js';

const Home = ({ navigation }) => (
  <View style={defaultStyle.container}>
    <Text style={styles.title}>TCC</Text>
    <Text style={styles.title}>Gerenciamento de cursos simplificado</Text>

    <TouchableOpacity onPress={() => navigation.navigate('Login') }>
      <Text style={defaultStyle.button}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate('CadastroAluno') }>
      <Text style={defaultStyle.button}>Cadastro</Text>
    </TouchableOpacity>

    {/* <TouchableOpacity onPress={() => navigation.navigate('About') }>
      <Text style={defaultStyle.button}>About</Text>
    </TouchableOpacity> */}
  </View>
);

Home.navigationOptions = {
  title: ''
}

export default Home;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
});