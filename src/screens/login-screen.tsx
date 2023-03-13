import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import Logo from '../components/Logo';
import {styles} from '../theme/app-theme';
import {emailValidator} from '../functions/validate-mail';
import {loginUserVerifier} from '../functions/login-user-verifier';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserServices} from '../services/user-services';
import {ProductServices} from '../services/product-service';
import { DeliveryService } from '../services/delivery-service';
import { EmployeeService } from '../services/employee';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}: Props) => {
  haveToken();
  const [textEmail, onChangeTextEmail] = React.useState({value: '', error: ''});
  const [textPassword, onChangeTextPassword] = React.useState({
    value: '',
    error: '',
  });

  //---------------------------- FUNCTIONS ----------------------------
  //verificar si el usuario ya inicio sesión
  async function haveToken() {
    const token = await AsyncStorage.getItem('x-access-token');
    if (token != null) {
      await UserServices.getUserByToken();
      await ProductServices.getProducts();
      await EmployeeService.getEmployeeByToken();
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    }
  }

  //inicio de sesión
  async function loginUser() {
    const emailError = emailValidator(textEmail.value);
    const passwordError = await loginUserVerifier(
      textEmail.value,
      textPassword.value,
    );
    if (emailError || passwordError) {
      onChangeTextEmail({...textEmail, error: emailError});
      onChangeTextPassword({...textPassword, error: passwordError});
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeScreen'}],
    });
  }

  return (
    <View style={styles.container}>
      {/* ---------------------------- BODY ---------------------------- */}
      <ScrollView style={styles.scroll}>
        {/* ------- LOGO ------- */}
        <View style={style.logo}>
          <Logo />
        </View>
        {/* ------- TEXTS ------- */}
        <Text style={style.title}> Te damos la Bienvenida! </Text>
        <Text style={style.text}> Inicio de Sesión </Text>
        {/* ------- INPUTS ------- */}
        <View style={style.boxInputs}>
          <TextInput
            style={style.input}
            onChangeText={text => onChangeTextEmail({value: text, error: ''})}
            value={textEmail.value}
            placeholder="Ingresa tu correo electrónico"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
          />
          {textEmail.error != '' ? (
            <Text style={style.textError}>{textEmail.error}</Text>
          ) : null}
          <TextInput
            style={style.input}
            onChangeText={text =>
              onChangeTextPassword({value: text, error: ''})
            }
            value={textPassword.value}
            placeholder="Ingresa tu contraseña"
            secureTextEntry={true}
          />
          {textPassword.error != '' ? (
            <Text style={style.textError}>{textPassword.error}</Text>
          ) : null}
          {/* ------- BUTTONS ------- */}
          <TouchableOpacity style={style.btnLogin} onPress={loginUser}>
            <Text style={style.textBtn}>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.btnRegister}
            onPress={() => navigation.navigate('UserRegisterScreen')}>
            <Text style={style.textBtn}>Registrarte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// --------------------------------- STYLES ---------------------------------
const style = StyleSheet.create({
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
  textError: {
    fontSize: 13,
    color: 'red',
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
  logo: {
    marginTop: 30,
    alignItems: 'center',
  },
  boxInputs: {
    width: '100%',
    paddingVertical: 10,
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
  },
  textBtn: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'white',
  },
  btnRegister: {
    alignItems: 'center',
    backgroundColor: '#7f8c8d',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});
