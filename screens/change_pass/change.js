import React, {useState} from 'react';
import {Button, TextInput, Text, Snackbar, withTheme} from 'react-native-paper';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {styles} from './change.css';
import {base_url} from '../../utils/const';
import {getUser, useLoginStore} from '../../utils/mobx/auth.store';

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

function ChangePass({navigation}) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState('');
  const onDismissSnackBar = () => setVisible('');
  const {login} = useLoginStore();

  const onSubmit = async () => {
    const {device, pass} = await getUser();
    if (oldPassword && newPassword && confirmNewPassword) {
      if (newPassword == confirmNewPassword) {
        if (oldPassword == pass) {
          setLoading(true);
          try {
            const res = await postData(base_url + '/api/apk/change-creds', {
              device,
              pass: newPassword,
            });
            await login(device, newPassword);
            setVisible('Password Changed');
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setLoading(false);
          } catch (error) {
            setVisible('Error Occured');
            setLoading(false);
          }
        } else {
          setVisible('Incorrect Password');
        }
      } else {
        setVisible('New password and Confirm password did not match');
      }
    } else {
      setVisible('Data is not Complete');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.form}>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            style={[styles.input]}
            label="Old Password"
            secureTextEntry
            value={oldPassword}
            onChangeText={text => setOldPassword(text)}
          />
          <TextInput
            style={styles.input}
            label="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
          />
          <TextInput
            style={styles.input}
            label="Confirm New Password"
            secureTextEntry
            value={confirmNewPassword}
            onChangeText={text => setConfirmNewPassword(text)}
          />
          <Button
            loading={loading}
            mode="contained"
            labelStyle={{fontSize: 25}}
            onPress={onSubmit}>
            <Text style={{fontSize: 14, color: '#fff'}}>Change Password</Text>
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

export default withTheme(ChangePass);
