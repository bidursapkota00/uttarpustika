import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {Button, Appbar} from 'react-native-paper';
import {Platform} from 'react-native';
import {withTheme} from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

function Contact({theme}) {
  const {colors} = theme;
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
      }}>
      <Appbar.Header>
        <Appbar.Content title="Title" subtitle={'Subtitle'} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <Text style={{color: 'black'}}>Contact Screen</Text>
      <Icon name="home" size={30} color="#900" />
      <Button raised theme={{roundness: 3}}>
        Press me
      </Button>
    </View>
  );
}

export default withTheme(Contact);
