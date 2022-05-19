import React, {useEffect, useRef} from 'react';
import {View, Animated, Text, StyleSheet} from 'react-native';

export default function UniversityItem({index, children}) {
  const left = useRef(new Animated.Value(0)).current;
  const goLeft = () => {
    Animated.timing(left, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      delay: index * 300,
    }).start();
  };
  useEffect(() => {
    goLeft();
  }, [left]);
  return (
    <Animated.View
      style={[
        styles.fadingContainer,
        {
          transform: [
            {
              translateX: left.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          opacity: left,
        },
      ]}>
      {children}
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  fadingContainer: {},
});
