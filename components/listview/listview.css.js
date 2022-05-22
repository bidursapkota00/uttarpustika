import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  imgc: {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  img: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
