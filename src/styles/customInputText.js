import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import defaultStyle from '../styles/defaultStyle.js';
import { TextInputMask } from 'react-native-masked-text'

class CustomInputText extends Component {
  render = () => {
    return (
        <TextInput
        placeholderTextColor="#FFF"
        style={[this.props.style, defaultStyle.inputText]}
        placeholder={this.props.placeholder}
        secureTextEntry={this.props.secureTextEntry}
        name={this.props.name}
        type={this.props.type}
        onChange={this.props.onChange}
        onChangeText={this.props.onChangeText}
        clearButtonMode={this.props.clearButtonMode}
        >
        {this.props.children}
        </TextInput>
    );
  }
}

export default CustomInputText;