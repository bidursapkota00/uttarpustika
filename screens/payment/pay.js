import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Text, TextInput, Snackbar, Button} from 'react-native-paper';
import {getUser} from '../../utils/mobx/auth.store';
import {base_url} from '../../utils/const';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';
import {KHALTI_PUBLIC_KEY} from '@env';
import {styles} from './pay.css';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

const Pay = ({navigation}) => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState({});
  const [visible, setVisible] = useState('');
  const onDismissSnackBar = () => setVisible('');
  const [mobile, setMobile] = useState('');
  const [transaction_pin, setPin] = useState('');
  const [confirmation_code, setOtp] = useState('');

  const amount = userData?.total_litre
    ? userData?.total_litre == 0
      ? 0
      : userData.total_litre > 20000
      ? (userData.total_litre / 1000) * 8
      : 80
    : 0;
  const [khalti, setKhalti] = useState('initiate');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    if (mobile && transaction_pin) {
      try {
        const res = await postData(
          'https://khalti.com/api/v2/payment/initiate/',
          {
            mobile,
            transaction_pin,
            amount: parseInt(amount * 100),
            product_identity: 'water',
            product_name: 'water',
            public_key: KHALTI_PUBLIC_KEY,
          },
        );
        if (res.token) {
          const {device} = await getUser();
          const resp = await postData(base_url + '/api/khalti/initiate', {
            device,
            status: 'Initialized',
            token: res.token,
            amount,
          });
          if (resp._id) setKhalti(res.token);
          else setVisible('Error Occured');
        } else setVisible('Error Occured');
      } catch (error) {
        setVisible('Error Occured');
      }
    } else {
      setVisible('Data is not Complete');
    }
    setLoading(false);
  };

  const onConfirm = async () => {
    setLoading(true);
    if (confirmation_code) {
      try {
        const res = await postData(
          'https://khalti.com/api/v2/payment/confirm/',
          {
            transaction_pin,
            public_key: KHALTI_PUBLIC_KEY,
            confirmation_code,
            token: khalti,
          },
        );
        if (res.token) {
          const {device} = await getUser();
          const [resp, res] = await Promise.all([
            postData(base_url + '/api/khalti/initiate', {
              device,
              status: 'Confirmed',
              token: khalti,
              amount,
            }),
            postData(base_url + '/api/khalti/verify', {
              device,
            }),
          ]);
          if (res.message) {
            await postData(base_url + '/api/khalti/initiate', {
              device,
              status: 'Verified',
              token: khalti,
              amount,
            });
            setVisible('Payment Success');
            setMobile('');
            setPin('');
            setOtp('');
            setKhalti('initiate');
            setTimeout(() => navigation.navigate('Home'), 3000);
          }
        }
      } catch (error) {
        console.log(error);
        setVisible('Error Occured');
      }
    } else {
      setVisible('Data is not Complete');
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const {device} = await getUser();
      const res = await postData(base_url + '/api/apk/home', {
        device,
      });
      setUserData(res?.message);
    };
    fetchData().catch(error => setVisible(error.toString()));
  }, [isFocused]);

  return (
    <KeyboardAvoidingView style={styles.home}>
      <ScrollView>
        <LinearGradient colors={['#1b8bb9', '#095d9b']} style={styles.gradient}>
          <View style={styles.left}>
            <View style={styles.row}>
              <Icon name="account-circle" size={30} color="#9ce1e8" />
              <Text style={styles.textUser}>{userData?.user?.name}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="house" size={30} color="#9ce1e8" />
              <Text style={styles.textUser}>{userData?.user?.address}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="speed" size={30} color="#9ce1e8" />
              <Text style={styles.text}>
                {(userData?.total_litre / 1000)?.toFixed(3)} units
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <Icon name="opacity" size={80} color="#9ce1e8" />
            <Text style={[styles.ltr]}>
              {userData?.total_litre?.toFixed(1)} ltr.
            </Text>
          </View>
        </LinearGradient>
        <Text style={styles.due}>
          Due: Rs.
          {amount.toFixed(2)}
        </Text>

        {khalti === 'initiate' ? (
          <>
            <TextInput
              style={[styles.input]}
              label="Mobile"
              value={mobile}
              onChangeText={text => setMobile(text)}
            />
            <TextInput
              style={[styles.input]}
              label="Pin"
              secureTextEntry
              value={transaction_pin}
              onChangeText={text => setPin(text)}
            />
            <View style={{paddingBottom: 15}}>
              <Button
                loading={loading}
                mode="contained"
                onPress={onSubmit}
                labelStyle={{fontSize: 25}}>
                <Text style={{fontSize: 14, color: '#fff'}}>Khalti Pay</Text>
              </Button>
            </View>
          </>
        ) : (
          <>
            <TextInput
              style={[styles.input]}
              label="OTP"
              value={confirmation_code}
              onChangeText={text => setOtp(text)}
            />
            <View style={{paddingBottom: 15}}>
              <Button
                labelStyle={{fontSize: 25}}
                loading={loading}
                mode="contained"
                onPress={onConfirm}>
                <Text style={{fontSize: 14, color: '#fff'}}>Confirm</Text>
              </Button>
            </View>
          </>
        )}
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
};

export default Pay;
