import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  cont: {
    height: '90%',
  },
  listc: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '10%',
  },
  list: {
    width: '33%',
  },
  slide: {
    height: 250,
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideimg: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  ads: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '10%',
  },
  ad: {
    width: '100%',
    height: '100%',
  },
});
