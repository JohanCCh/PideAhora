import React from 'react';
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
    const {data}: any = await pideAhoraApi.post<User>('/users/get-user-token');
    UserServices.user = data[0];
  };

}
