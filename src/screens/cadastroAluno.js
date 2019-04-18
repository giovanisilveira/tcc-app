import React from 'react';
import { StyleSheet, View, Button, Text, Image, TouchableOpacity, Animated, Dimensions, Keyboard, UIManager, TextInput } from 'react-native';
import defaultStyle from '../styles/defaultStyle.js';
import CustomInputText from '../styles/customInputText.js';
import { TextInputMask } from 'react-native-masked-text'
import api from '../services/api.js'

const { State: TextInputState } = TextInput;

export default class CadastroAluno extends React.Component {
  static navigationOptions = {
    title: 'Cadastro Aluno',
  };

  state = {
    cpf: '',
    nome: '',
    endereco: '',
    uf: '',
    municipio: '',
    telefone: '',
    email: '',
    senha: '',

    errorMessage: null,
    successMessage: null,

    shift: new Animated.Value(0),
  }

  cadastrar = async () => {
    try {
        const param = {
            params: {
                cpf: this.state.cpf,
                nome: this.state.nome,
                endereco: this.state.endereco,
                uf: this.state.uf,
                municipio: this.state.municipio,
                telefone: this.state.telefone,
                email: this.state.email,
                senha: this.state.senha,
           }
        }
        const response = await api.post('/alunos/', {}, param);

        this.setState({ 
            successMessage: "Cadastro Realizado!",
            errorMessage: null,
            cpf: '',
            nome: '',
            endereco: '',
            uf: '',
            municipio: '',
            telefone: '',
            email: '',
            senha: '',
        });
    }catch (response) {
        this.setState({ 
            errorMessage: response.data.errorMessage,
            successMessage: null,
        });
    }
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={defaultStyle.container}>
        <Animated.View style={[defaultStyle.container, { transform: [{translateY: this.state.shift}] }]}>
            { this.state.errorMessage && <Text style={defaultStyle.erroMessage}>{ this.state.errorMessage } </Text> }

            <TextInputMask type={'cpf'} style={[defaultStyle.inputText, {width: 250}]} placeholder="cpf" placeholderTextColor="#FFF" value={this.state.cpf} onChangeText={text => { this.setState({ cpf: text })}} clearButtonMode='always'/>
            <CustomInputText style={{width: 250}} placeholder="nome" value={this.state.nome} onChangeText={(nome) => this.setState({nome})} clearButtonMode='always'/>
            <CustomInputText style={{width: 250}} placeholder="endereco" value={this.state.endereco}  onChangeText={(endereco) => this.setState({endereco})} clearButtonMode='always'/>
            <CustomInputText style={{width: 250}} placeholder="uf" value={this.state.uf}  onChangeText={(uf) => this.setState({uf})} clearButtonMode='always'/>
            <CustomInputText style={{width: 250}} placeholder="municipio" value={this.state.municipio}  onChangeText={(municipio) => this.setState({municipio})} clearButtonMode='always'/>
            <TextInputMask type={'cel-phone'} options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}} style={[defaultStyle.inputText, {width: 250}]} placeholder="telefone" placeholderTextColor="#FFF" value={this.state.telefone} onChangeText={text => { this.setState({ telefone: text })}} clearButtonMode='always'/>
            <CustomInputText style={{width: 250}} placeholder="email" value={this.state.email}  onChangeText={(email) => this.setState({email})} clearButtonMode='always'/>
            <CustomInputText style={{width: 250}} placeholder="senha" secureTextEntry={true} value={this.state.senha} onChangeText={(senha) => this.setState({senha})} clearButtonMode='always'/>

            <TouchableOpacity onPress={this.cadastrar}>
                <Text style={[defaultStyle.button, {marginTop: 25}]}>Cadastrar</Text>
            </TouchableOpacity>

            { this.state.successMessage && <Text style={defaultStyle.successMessage} >{ this.state.successMessage } </Text> }
        </Animated.View>
        </View> 
    );
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY + 30;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);

      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 1000,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }


}
