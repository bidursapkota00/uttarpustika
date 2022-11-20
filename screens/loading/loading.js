import * as React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useLoginStore} from '../../utils/mobx/auth.store';
import {useIsFocused} from '@react-navigation/native';
import {styles} from './loading.css';

const Loading = () => {
  const {checkIfLoggedIn} = useLoginStore();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    checkIfLoggedIn();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size="large" />
    </View>
  );
};

export default Loading;
