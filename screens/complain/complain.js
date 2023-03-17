import React, {useState} from 'react';
import {Button, TextInput, Text, Snackbar, withTheme} from 'react-native-paper';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {styles} from './complain.css';
import {base_url} from '../../utils/const';
import {getUser} from '../../utils/mobx/auth.store';

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

function Complain({navigation}) {
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState('');
  const onDismissSnackBar = () => setVisible('');

  const onSubmit = async () => {
    const {device} = await getUser();
    if (subject && description) {
      setLoading(true);
      try {
        const res = await postData(base_url + '/api/apk/complain', {
          device,
          subject,
          description,
        });
        setVisible('Complain Successful');
        setSubject('');
        setDescription('');
        setLoading(false);
      } catch (error) {
        setVisible('Error Occured');
        setLoading(false);
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
            label="Subject"
            value={subject}
            onChangeText={text => setSubject(text)}
          />
          <TextInput
            style={styles.input}
            label="Description"
            value={description}
            onChangeText={text => setDescription(text)}
            multiline
            numberOfLines={7}
          />
          <Button
            loading={loading}
            mode="contained"
            labelStyle={{fontSize: 25}}
            onPress={onSubmit}>
            <Text style={{fontSize: 14, color: '#fff'}}>Submit</Text>
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

export default withTheme(Complain);
