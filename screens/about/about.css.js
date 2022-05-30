import {StyleSheet} from 'react-native';

const disclaimer_title = {
  textAlign: 'center',
  fontSize: 24,
  lineHeight: 30,
  marginBottom: 15,
  color: '#040A40',
  textTransform: 'uppercase',
};

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  description: {
    backgroundColor: '#FF8033',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  disclaimer_title: {...disclaimer_title},
  disclaimer: {
    color: '#040A40',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 40,
  },
  credit: {...disclaimer_title},
  name: {
    fontSize: 16,
    lineHeight: 18,
    paddingLeft: 20,
    paddingBottom: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#4b81f4',
    marginBottom: 20,
    color: '#1557e3',
  },
});
