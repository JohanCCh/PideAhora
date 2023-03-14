import React from 'react';
import {Alert} from 'react-native';
import {
  LoginResponse,
  RegisterResponse,
  User,
  UserLogin,
  UserRegister,
} from '../interfaces/user';
import pideAhoraApi from '../api/pideAhoraApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EmployeeService} from './employee';

export class UserServices extends React.Component {
  //usuario actual
  static user: User | null = null;
  //rol del usuario actual
  static role: string | null = null;
  //id del empleado actual
  static employeeId: number | null = null;

  //inicio de sesión
  static login = async ({email, password}: UserLogin) => {
    const {data} = await pideAhoraApi.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    //console.log(data);
    if (data.token != null) {
      await AsyncStorage.setItem('x-access-token', data.token);
      await EmployeeService.getEmployeeByToken();
    }
    UserServices.user = data.user;
    return data;
  };

  //registro de usuario
  static logout = async ({name, email, password}: UserRegister) => {
    const {data} = await pideAhoraApi.post<RegisterResponse>('/auth/register', {
      name,
      email,
      password,
    });
    //console.log(data);
    return data;
  };

  //obtener el usuario actual por token
  static getUserByToken = async () => {
    const {data}: any = await pideAhoraApi.post<User>(`/users/get-user-token`);
    UserServices.user = data[0];
  };

  //actualizar la dirección del usuario
  static updateAddress = async (address: string) => {
    const id = UserServices.user?.id;
    const {data}: any = await pideAhoraApi.put<any>(`/users/${id}/address`, {
      address,
    });
    //console.log(data);
    if (UserServices.user != null && data.body.user.address != '') {
      UserServices.user.address = data.body.user.address;
    } else {
      Alert.alert(
        'Error de guardado!',
        'No se pudo guardar la dirección, inténtelo mas tarde.',
      );
    }
  };
}
