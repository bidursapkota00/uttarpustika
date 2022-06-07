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
  credits: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#505050',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
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
    padding: 20,
    color: '#303030',
    textTransform: 'capitalize',
  },
});
