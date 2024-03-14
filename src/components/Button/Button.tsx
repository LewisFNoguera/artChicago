import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonProps } from '@utils/interface/artworks.interface';
import { styles } from './Button.Style';

const Button = ({ label, onPress, type, size = 'full' }: ButtonProps) => (
  <TouchableOpacity style={[styles.button, styles[type], styles[size]]} onPress={() => onPress()}>
    <Text style={[styles.textBase, styles[`text_${type}`]]}>{label}</Text>
  </TouchableOpacity>
);

export default Button;
