import React, {useState} from 'react';
import {Button, TextInput, Text, Snackbar, withTheme} from 'react-native-paper';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {styles} from './register.css';

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

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [visible, setVisible] = useState('');
  const onDismissSnackBar = () => setVisible('');

  const onSubmit = async () => {
    if (password && id) {
      try {
        const res = await postData(
          'https://water-flow-meter.herokuapp.com/api/apk/login',
          {
            id,
            password,
          },
        );
        setVisible(res.message);
        if (res.status == 200) {
          setPassword('');
          setId('');
        }
      } catch (error) {
        console.log(error);
        setVisible('Error Occured');
      }
    } else {
      setVisible('Data is not Complete');
    }
  };

  return (
    <KeyboardAvoidingView>
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
