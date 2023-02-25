import {StatusBar, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // --------------------------------- CONTAINER MAIN ---------------------------------,
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faebd7',
  },
  // --------------------------------- SCROLL ---------------------------------
  scroll: {
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
    //backgroundColor: 'red',
  },
  // --------------------------------- HEADER ---------------------------------
  header: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#faebd7',
    elevation: 50,
    borderBottomWidth: 0.1,
    flexDirection: 'row',
  },
  titleHeader: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  withSection: {
    width: '12%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  searchSection: {
    width: '76%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
    padding: 5,
  },
  imgBtnSection: {
    width: 30,
    height: 30,
  },
  btnSection: {
    width: 40,
    height: 40,
    padding: 5,
    alignItems: 'center',
    //backgroundColor: '#3380ff',
    borderRadius: 50,
  },
  ImageBtnSearch: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
  inputSearch: {
    paddingLeft: 5,
    backgroundColor: '#fff',
    color: '#424242',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: '80%',
  },
  // --------------------------------- BODY ---------------------------------
  body: {
    paddingVertical: 10,
    //backgroundColor: 'red',
  },
});
