import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderWidth: 3,
    borderRadius: 500,
    borderColor: '#090',
    borderStyle: 'solid',
    width: 80,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#090',
  },
  para: {
    fontSize: 14,
    color: '#111',
  },
  linkto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    justifyContent: 'flex-end',
  },
  goto: {
    color: '#000',
  },
});
