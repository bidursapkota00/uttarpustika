import * as React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import {useLoginStore} from '../../utils/mobx/auth.store';
import {styles} from './loading.css';

const Loading = ({navigation}) => {
  const {checkIfLoggedIn} = useLoginStore();

  React.useEffect(() => {
    NetInfo.fetch().then(state => {
      state.isInternetReachable
        ? checkIfLoggedIn()
        : navigation.navigate('Retry');
    });
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
};

export default Loading;
