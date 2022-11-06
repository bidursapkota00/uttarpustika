import * as React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {styles} from './loading.css';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator animating={true} size="large" />
  </View>
);

export default Loading;
