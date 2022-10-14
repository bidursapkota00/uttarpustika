import React, {useState} from 'react';
import {
  Button,
  Title,
  TextInput,
  Text,
  Snackbar,
  withTheme,
} from 'react-native-paper';
import {View} from 'react-native';
import {styles} from './register.css';

function Register({theme}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [citizenship, setCitizenship] = useState('');

  const [visible, setVisible] = useState('');
  const onDismissSnackBar = () => setVisible('');

  const onSubmit = () => {
    if (name && email && number && password && confirmPassword && citizenship) {
      if (password !== confirmPassword) {
        setVisible('Password and Confirm Password is not matching');
        return;
      }
      if (!citizenship.includes('-')) {
        setVisible('Use "-" to seperate citizenship number');
        return;
      }
      console.log(name, email, number, password, citizenship);
    } else {
      setVisible('Data is not Complete');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Request for Water Service!</Title>
      <TextInput
        style={[styles.input]}
        label="Full Name"
        value={name}
        onChangeText={text => setName(text)}
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
        style={[styles.input]}
        label="Citizenship Number"
        value={citizenship}
        onChangeText={text => setCitizenship(text)}
      />
      <Button mode="contained" onPress={onSubmit}>
        Submit
      </Button>
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
    </View>
  );
}

export default withTheme(Register);
