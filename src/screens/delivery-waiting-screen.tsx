import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {UserServices} from '../services/user-services';
import {styles} from '../theme/app-theme';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const DeliveryWaitingScreen = ({navigation}: Props) => {
  const [textAddress, onChangeTextAddress] = React.useState({
    value: '',
    error: '',
  });

  //---------------------------- FUNCTIONS ----------------------------

  //guardar dirección
  async function saveAddress() {
    if (textAddress.value == '') {
      onChangeTextAddress({
        ...textAddress,
        error: 'Por favor ingrese una dirección',
      });
    } else {
      await UserServices.updateAddress(textAddress.value).finally(() => {
        if (UserServices.user?.address != null) {
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
        }
      });
    }
  }

  return (
    <View style={styles.container}>
      {/* ---------------------------- BODY ---------------------------- */}
      <View style={style.paddingContainer}>
        {/* ------- LOGO ------- */}
        <View style={style.logo}>
          <Image
            source={require('../assets/address.png')}
            style={style.image}
          />
        </View>
        <Text style={style.title}> Mi Dirección!</Text>
        <Text style={style.text}>
          {' '}
          Tenga en cuenta que se usara para entregar sus pedidos.{' '}
        </Text>
        <View style={style.boxInputs}>
          <TextInput
            style={style.input}
            onChangeText={text => onChangeTextAddress({value: text, error: ''})}
            value={textAddress.value}
            placeholder="Ingresa tu dirección de domicilio"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {textAddress.error != '' ? (
            <Text style={style.textError}>{textAddress.error}</Text>
          ) : null}
        </View>
        {/* ------- BUTTONS ------- */}
        <TouchableOpacity style={style.btnLogin} onPress={() => saveAddress()}>
          <Text style={style.textBtn}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --------------------------------- STYLES ---------------------------------
const style = StyleSheet.create({
  paddingContainer: {
    paddingHorizontal: 20,
    flex: 1,
    alignContent: 'center',
    //justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    //backgroundColor: 'red',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  logo: {
    marginTop: 30,
    alignItems: 'center',
    padding: 10,
  },
  boxInputs: {
    width: '100%',
    paddingTop: 30,
    textAlignVertical: 'center',
    //backgroundColor:'green',
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    //backgroundColor: 'red',
  },
  btnLogin: {
    alignItems: 'center',
    backgroundColor: '#1847e7',
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  textBtn: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  textError: {
    fontSize: 13,
    color: 'red',
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
});
