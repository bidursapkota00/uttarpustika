import React, {useRef, useEffect} from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import UniversityItem from './universityItem';

const Home = () => {
  const university = ['TU', 'PU', 'POU', 'KU', '+2'];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={university}
        renderItem={({item, index}) => (
          <UniversityItem index={index}>
            <View style={styles.bg}>
              <Text style={styles.fadingText}>{item}</Text>
            </View>
          </UniversityItem>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fadingText: {
    fontSize: 14,
    color: 'black',
  },
  bg: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 30,
  },
});

export default Home;
