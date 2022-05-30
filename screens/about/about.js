import React from 'react';
import {View, Text, ScrollView, Image, Linking} from 'react-native';
import {styles} from './about.css';

export default function About() {
  return (
    <ScrollView>
      <View style={styles.about}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://images.unsplash.com/photo-1592743263126-bb241ee76ac7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJhbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80',
          }}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.disclaimer_title}>Disclaimer</Text>
        <Text style={styles.disclaimer}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
          quia, itaque architecto suscipit, aperiam optio rem necessitatibus
          tempora est sapiente perspiciatis sequi eius! Asperiores placeat nulla
          minus perspiciatis, vitae dolores nulla doloremque ea saepe aperiam
          quas possimus odit nemo deleniti!
        </Text>
        <Text style={styles.credit}>Credit</Text>
        {[...new Array(6)].map((_, i) => (
          <Text
            style={styles.name}
            onPress={() => Linking.openURL('http://google.com')}>
            Aalu prasad pidalu
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
