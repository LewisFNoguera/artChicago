import React from 'react';
import { View, Text, Modal } from 'react-native';

import { ToastProps } from '@utils/interface/toast.interface';
import { styles } from './Toast.Style';

const Toast = ({ message }: ToastProps) => (
  <Modal transparent={true} animationType="fade">
    <View style={styles.container}>
      <View style={styles.toast}>
        <Text>{message}</Text>
      </View>
    </View>
  </Modal>
);
export default Toast;
