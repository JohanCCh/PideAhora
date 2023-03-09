import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from '../theme/app-theme';
import {emailValidator} from '../functions/validate-mail';
import {UserServices} from '../services/user-services';

interface Props extends StackScreenProps<any, any> {}

export const UserRegisterScreen = ({navigation}: Props) => {
  const [textName, onChangeTextName] = React.useState({value: '', error: ''});
  const [textEmail, onChangeTextEmail] = React.useState({value: '', error: ''});
  const [textPassword, onChangeTextPassword] = React.useState({
    value: '',
    error: '',
  });
  const [textPasswordConfirm, onChangeTextPasswordConfirm] = React.useState({
    value: '',
    error: '',
  });

  //---------------------------- FUNCTIONS ----------------------------

  function validatePassword() {
    if (textPassword.value != textPasswordConfirm.value)
      return 'Las contraseñas no coinciden';
    if (textPassword.value.length < 8)
      return 'La contraseña debe tener al menos 8 caracteres';
    return '';
  }

  function validateName() {
    if (!textName.value) return 'Ingresa un nombre de usuario';
    return '';
  }

  async function registerUser() {
    const emailError = emailValidator(textEmail.value);
    const passwordError = validatePassword();
    const nameError = validateName();
    if (emailError || passwordError || nameError) {
      onChangeTextEmail({...textEmail, error: emailError});
      onChangeTextPassword({...textPassword, error: passwordError});
      onChangeTextPasswordConfirm({
        ...textPasswordConfirm,
        error: passwordError,
      });
      onChangeTextName({...textName, error: nameError});
      return;
    }
    const name = textName.value;
    const email = textEmail.value;
    const password = textPassword.value;
    const data: any = await UserServices.logout({name, email, password});
    if (data.body.user_exists) {
      Alert.alert(
        'El email ya esta siendo usado',
        'Por favor inicie sesión o use otro email',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: () => {
              // opción del on press
            },
          },
        ],
      );
    } else if (!data.body.user_exists) {
      Alert.alert(
        'Usuario registrado correctamente',
        'Por favor inicie sesión',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: () => {
              navigation.navigate('LoginScreen');
            },
          },
        ],
      );
    }
  }

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
            onChangeText={value => onChangeTextName({value: value, error: ''})}
            value={textName.value}
            placeholder="Ingresa un nombre de usuario"
          />
          {textName.error != '' ? (
            <Text style={style.textError}>{textName.error}</Text>
          ) : null}
          <TextInput
            style={style.input}
            onChangeText={text => onChangeTextEmail({value: text, error: ''})}
            value={textEmail.value}
            placeholder="Ingresa tu correo electrónico"
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
          <TextInput
            style={style.input}
            onChangeText={text =>
              onChangeTextPasswordConfirm({value: text, error: ''})
            }
            value={textPasswordConfirm.value}
            placeholder="Confirma tu contraseña"
            secureTextEntry={true}
          />
          {textPasswordConfirm.error != '' ? (
            <Text style={style.textError}>{textPasswordConfirm.error}</Text>
          ) : null}
          {/* ------- BUTTONS ------- */}
          <TouchableOpacity
            style={style.btnRegister}
            onPress={() => registerUser()}>
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
  textError: {
    fontSize: 13,
    color: 'red',
    paddingBottom: 8,
    paddingHorizontal: 10,
  },
});
