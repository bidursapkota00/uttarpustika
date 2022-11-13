import React, {useState} from 'react';
import {Button, TextInput, Text, Snackbar, withTheme} from 'react-native-paper';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {useLoginStore} from '../../utils/mobx/auth.store';
import {styles} from './login.css';
import {base_url} from '../../utils/const';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function Login({navigation}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [visible, setVisible] = useState('');
  const onDismissSnackBar = () => setVisible('');

  const {login} = useLoginStore();

  const onSubmit = async () => {
    if (password && id) {
      try {
        const res = await postData(base_url + '/api/apk/login', {
          device: id,
          pass: password,
        });
        if (res.message === true) {
          await login(id, password);
        } else if (res.message) {
          setVisible('Invalid Id or password');
        }
      } catch (error) {
        setVisible('Error Occured');
      }
    } else {
      setVisible('Data is not Complete');
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1, paddingBottom: 50}}>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            style={[styles.input]}
            label="Device Id"
            value={id}
            onChangeText={text => setId(text)}
          />
          <TextInput
            style={styles.input}
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <Button mode="contained" onPress={onSubmit}>
            Login!
          </Button>
          <View style={styles.dont}>
            <Text variant="labelSmall">Don't have an account?</Text>
            <Button
              contentStyle={{justifyContent: 'flex-start', padding: 0}}
              uppercase={false}
              onPress={() => navigation.navigate('Register')}>
              Register
            </Button>
          </View>
        </View>
      </ScrollView>
      <View style={styles.snackbar}>
        <Snackbar
          duration={3000}
          visible={visible ? true : false}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Hide',
            onPress: () => {
              setVisible('');
            },
          }}>
          {visible}
        </Snackbar>
      </View>
    </KeyboardAvoidingView>
  );
}

export default withTheme(Login);
