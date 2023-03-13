import React from 'react';
import pideAhoraApi from '../api/pideAhoraApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Employee} from '../interfaces/employee';
import {DeliveryService} from './delivery-service';
import {UserServices} from './user-services';

export class EmployeeService extends React.Component {
  //devuelve un empleado por id
  static getEmployeeByToken = async () => {
    const {data}: any = await pideAhoraApi.get<Employee>(`/employees/token`);
    //console.log(data);
    if (data.length > 0) {
      await DeliveryService.getAllDeliveries();
      await DeliveryService.getMyDeliveries();
      await AsyncStorage.setItem('role', data[0].role);
      UserServices.role = data[0].role;
    } else {
      await AsyncStorage.setItem('role', 'cliente');
      UserServices.role = 'cliente';
    }
  };
}
