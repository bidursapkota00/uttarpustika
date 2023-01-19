import React, {useState} from 'react';
import {Button, TextInput, Text, Snackbar, withTheme} from 'react-native-paper';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {styles} from './pass.css';

function Pass() {
  const [ssid, setSsid] = useState('');
  const [pass, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState('');
  const onDismissSnackBar = () => setVisible('');

  const onSubmit = async () => {
    if (pass && ssid) {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        ssid,
        pass,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch('http://192.168.4.1/credentials', requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          setVisible('Password Changed Successfully');
          setLoading(false);
          setSsid('');
          setPassword('');
        })
        .catch(error => {
          console.log('error', error);
          setVisible('Error Occured');
          setLoading(false);
        });
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
            label="SSID"
            value={ssid}
            onChangeText={text => setSsid(text)}
          />
          <TextInput
            style={styles.input}
            label="Password"
            secureTextEntry
            value={pass}
            onChangeText={text => setPassword(text)}
          />
          <Button
            loading={loading}
            mode="contained"
            labelStyle={{fontSize: 25}}
            onPress={onSubmit}
            uppercase={false}>
            <Text style={styles.btn__pas}>Change Password</Text>
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

export default withTheme(Pass);
