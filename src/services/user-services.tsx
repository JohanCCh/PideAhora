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

  //inicio de sesion
  static login = async ({email, password}: UserLogin) => {
    const {data} = await pideAhoraApi.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    //console.log(data);
    if (data.token != null) {
      await AsyncStorage.setItem('x-access-token', data.token);
      EmployeeService.getEmployeeById(data.user.id);
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
    const role = await AsyncStorage.getItem('role');
    //console.log(data);
    UserServices.user = data[0];
    if (role != null) UserServices.role = role;
  };

  //--------------------------------------------------------------------------------------------------
  //devuelve un usuario
  static getUserProfile = (id: string) => {
    return {
      id: 1,
      name: 'Javier Brito',
      email: 'jbrito2@utmachala.edu.ec',
      image_url:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    };
  };

  //devuelve todos los usuarios
  static getAllUsers = () => {
    return [
      {
        id: 1,
        name: 'Javier Brito',
        email: 'jbrito2@utmachala.edu.ec',
        image_url:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        id: 2,
        name: 'Mario Ortega',
        email: 'ortega12@ejemplo.com',
        image_url: '',
      },
      {
        id: 3,
        name: 'Mariana Sanchez',
        email: 'msanchez12@ejemplo.com',
        image_url: '',
      },
      {
        id: 4,
        name: 'Susana Perez',
        email: 'sperez1@ejemplo.com',
        image_url: '',
      },
    ];
  };
}
