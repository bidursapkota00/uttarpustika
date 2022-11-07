import React, {useState} from 'react';
import {withTheme, Button} from 'react-native-paper';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './requested.css';

function RegisterSuccess({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <Icon name="check" size={50} color="#090" />
        </View>
        <Text style={styles.title}>Request Sent !!!</Text>
      </View>

      <Text style={[styles.para, {marginTop: 15}]}>
        Service request has been sent. You will be notified soon.
      </Text>

      <Text style={[styles.para, {marginTop: 5}]}>
        Device Id will be sent to your email account.
      </Text>

      <View style={styles.linkto}>
        <Text style={styles.goto}>Go to</Text>
        <Button
          contentStyle={{justifyContent: 'flex-start', padding: 0}}
          uppercase={false}
          onPress={() => navigation.navigate('Login')}>
          Login Page
        </Button>
      </View>
    </View>
  );
}

export default withTheme(RegisterSuccess);
