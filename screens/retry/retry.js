import * as React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {styles} from './retry.css';

const Retry = ({navigation}) => (
  <View style={styles.container}>
    <Text style={styles.error__text}>Opps! Something went wrong</Text>
    <Text style={styles.error__text}>Try checking your connection</Text>
    <Button
      icon="refresh"
      mode="contained"
      labelStyle={{fontSize: 25}}
      contentStyle={{flexDirection: 'row-reverse'}}
      style={styles.button}
      onPress={() => navigation.navigate('Loading')}>
      <Text style={styles.retry}>Retry</Text>
    </Button>
  </View>
);

export default Retry;
