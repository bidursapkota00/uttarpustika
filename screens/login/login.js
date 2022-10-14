import React, {useState} from 'react';
import {Button, Surface, Title, TextInput} from 'react-native-paper';
import {withTheme} from 'react-native-paper';
import {styles} from './login.css';

function Login({theme}) {
  const {colors} = theme;
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  return (
    <Surface style={[styles.surface, {backgroundColor: colors.primary}]}>
      <Surface style={[styles.formc, {backgroundColor: colors.primary}]}>
        <Title style={styles.text}>Login!</Title>
        <TextInput
          style={[styles.input]}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setpassword(text)}
          right={<TextInput.Icon name="eye" />}
        />
      </Surface>
    </Surface>
  );
}

export default withTheme(Login);
