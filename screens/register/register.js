import React, {useState} from 'react';
import {Button, TextInput, Text, Snackbar, withTheme} from 'react-native-paper';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {styles} from './register.css';
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

function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const [visible, setVisible] = useState('');
  const onDismissSnackBar = () => setVisible('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (otp) {
      setLoading(true);
      try {
        await postData(base_url + '/api/register', {
          name,
          address,
          email,
          password,
          number,
          citizenship,
          otp,
        });
        navigation.navigate('Register Success');
      } catch (error) {
        setLoading(false);
        setVisible('Error Occured');
      }
    } else {
      setVisible('Data is not Complete');
    }
  };

  const onVerify = async () => {
    if (
      name &&
      address &&
      email &&
      number &&
      password &&
      confirmPassword &&
      citizenship
    ) {
      if (password !== confirmPassword) {
        setVisible('Password and Confirm Password is not matching');
        return;
      }
      if (!citizenship.includes('-')) {
        setVisible('Use "-" to seperate citizenship number');
        return;
      }
      setLoading(true);
      try {
        const res = await postData(base_url + '/api/verifyemail', {
          name,
          email,
        });
        res.status == 200
          ? setShowOtp(true)
          : setVisible('Sending OTP Failed!, Please check your email!');
      } catch (error) {
        setVisible('Sending OTP Failed!, Please check your email!');
      }
      setLoading(false);
    } else {
      setVisible('Data is not Complete');
    }
  };

  const login = (
    <View style={styles.already}>
      <Text variant="labelMedium">Already have an account?</Text>
      <Button
        contentStyle={{justifyContent: 'flex-start', padding: 0}}
        uppercase={false}
        onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.form}>
      {showOtp ? (
        <View style={styles.container}>
          <TextInput
            style={[styles.input]}
            label="OTP"
            value={otp}
            onChangeText={text => setOtp(text)}
          />
          <Button
            loading={loading}
            mode="contained"
            labelStyle={{fontSize: 25}}
            onPress={onSubmit}>
            <Text style={{fontSize: 14, color: '#fff'}}>Register</Text>
          </Button>
          {login}
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              style={[styles.input]}
              label="Full Name"
              value={name}
              onChangeText={text => setName(text)}
            />
            <TextInput
              style={[styles.input]}
              label="Address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
            <TextInput
              style={[styles.input]}
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={[styles.input]}
              label="Phone Number"
              value={number}
              onChangeText={text => setNumber(text)}
            />
            <TextInput
              style={styles.input}
              label="Password"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
              // right={<TextInput.Icon name="eye" />}
            />
            <TextInput
              style={styles.input}
              label="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              // right={<TextInput.Icon name="eye" />}
            />
            <TextInput
              style={[styles.input, styles.cit]}
              label="Citizenship Number"
              value={citizenship}
              onChangeText={text => setCitizenship(text)}
            />
            <Button
              loading={loading}
              mode="contained"
              labelStyle={{fontSize: 25}}
              onPress={onVerify}>
              <Text style={{fontSize: 14, color: '#fff'}}>Register</Text>
            </Button>
            {login}
          </View>
        </ScrollView>
      )}

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

export default withTheme(Register);
