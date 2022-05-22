import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './listview.css';

export default function Listview({board}) {
  const {title, bg, icon, textcolor} = board;
  return (
    <View style={styles.item}>
      <View style={[styles.imgc, {backgroundColor: bg}]}>
        <Image style={styles.img} source={icon} />
      </View>
      <Text style={[styles.title, {color: textcolor}]}>{title}</Text>
    </View>
  );
}
