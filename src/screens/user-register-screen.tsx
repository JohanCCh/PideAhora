import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from '../theme/app-theme';

interface Props extends StackScreenProps<any, any> {}

export const UserRegisterScreen = ({navigation}: Props) => {
  const [textEmail, onChangeTextEmail] = React.useState('');
  const [textPassword, onChangeTextPassword] = React.useState('');
  const [textPasswordConfirm, onChangeTextPasswordConfirm] = React.useState('');

  return (
    <View style={styles.container}>
      {/* ---------------------------- BODY ---------------------------- */}
      <ScrollView style={styles.scroll}>
        {/* ------- LOGO ------- */}
        <View style={style.logo}>
          <Image
            source={require('../assets/iconUserRegister.png')}
            style={style.image}
          />
        </View>
        {/* ------- TEXT ------- */}
        <Text style={style.title}> Regístrate! </Text>
        {/* ------- INPUTS ------- */}
        <View style={style.boxInputs}>
          <TextInput
            style={style.input}
            onChangeText={onChangeTextEmail}
            value={textEmail}
            placeholder="Ingresa tu correo electrónico"
          />
          <TextInput
            style={style.input}
            onChangeText={onChangeTextPassword}
            value={textPassword}
            placeholder="Ingresa tu contraseña"
            secureTextEntry={true}
          />
          <TextInput
            style={style.input}
            onChangeText={onChangeTextPasswordConfirm}
            value={textPasswordConfirm}
            placeholder="Confirma tu contraseña"
            secureTextEntry={true}
          />
          {/* ------- BUTTONS ------- */}
          <TouchableOpacity
            style={style.btnRegister}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={style.textBtn}>Regístrate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.btnLogin}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={style.textBtn}>Iniciar Sesión</Text>
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
  btnRegister: {
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
  btnLogin: {
    alignItems: 'center',
    backgroundColor: '#7f8c8d',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  logo: {
    marginTop: 30,
    alignItems: 'center',
  },
});
