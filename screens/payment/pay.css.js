import {StyleSheet} from 'react-native';

const text = {
  fontSize: 16,
  marginLeft: 10,
  flex: 1,
  color: '#9ce1e8',
};

export const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#e1e1e1',
  },
  gradient: {
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 40,
  },
  left: {
    flex: 7,
    paddingLeft: 10,
    paddingTop: 25,
  },
  right: {
    flex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  text,
  textUser: {
    textTransform: 'capitalize',
    ...text,
  },
  ltr: {
    fontSize: 20,
    color: '#9ce1e8',
  },
  due: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 40,
    alignSelf: 'center',
    color: '#095d9b',
  },
  input: {
    marginBottom: 15,
  },
  snackbar: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});
