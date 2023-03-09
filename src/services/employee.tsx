import React from 'react';
import {UserServices} from './user-services';
import pideAhoraApi from '../api/pideAhoraApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Employee } from '../interfaces/employee';

export class EmployeeService extends React.Component {
  //devuelve un empleado por id
  static getEmployeeById = async (id: string) => {
    const {data}: any | Employee[] = await pideAhoraApi.get<Employee>(`/employees/${id}`);
    if (data != null) {
      await AsyncStorage.setItem('role', data[0].role);
      //console.log( await AsyncStorage.getAllKeys());
    }
    return data;
  };

  //--------------------------------------------------------------------------------------------------
  //devuelve las entregas q se le realizaron a un usuario
  static getOneEmployee = () => {
    return {
      user: UserServices.getAllUsers()['3'],
      role: 'empleado',
    };
  };
}
