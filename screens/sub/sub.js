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
import {styles} from './sub.css';

const Sub = () => {
  return (
    <View>
      <Text style={{color: 'black', fontSize: 64}}>Subjects</Text>
    </View>
  );
};

export default Sub;
