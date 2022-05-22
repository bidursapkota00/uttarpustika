import React, {useRef, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import Listview from '../../components/listview/listview';
import UniversityItem from './universityItem';
import {styles} from './home.css';

const Home = () => {
  const boards = [
    {
      title: 'TU',
      bg: '#ff4d4f',
      icon: require('../../img/school.png'),
      textcolor: '#5c0011',
    },
    {
      title: 'PU',
      bg: '#ff7a45',
      icon: require('../../img/school.png'),
      textcolor: '#610b00',
    },
    {
      title: 'POU',
      bg: '#ffa940',
      icon: require('../../img/school.png'),
      textcolor: '#612500',
    },
    {
      title: 'KU',
      bg: '#ffc53d',
      icon: require('../../img/school.png'),
      textcolor: '#613400',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listc}>
        {boards.map((b, i) => {
          return (
            <View style={styles.list} key={b.title}>
              <UniversityItem index={i}>
                <Listview board={b} />
              </UniversityItem>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Home;
