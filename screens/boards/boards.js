import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {boards, slideImg} from '../../utils/data';
import {styles} from './boards.css';

const Board = ({route, navigation}) => {
  const {itemId, otherParam} = route.params;
  return (
    <View>
      <Text style={{color: 'black', fontSize: 64}}>{otherParam}</Text>
      <Text style={{color: 'black', fontSize: 64}}>{itemId}</Text>
    </View>
  );
};

export default Board;
