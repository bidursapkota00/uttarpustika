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
import {styles} from './sem.css';

const Sem = () => {
  return (
    <View>
      <Text style={{color: 'black', fontSize: 64}}>Semester</Text>
    </View>
  );
};

export default Sem;
