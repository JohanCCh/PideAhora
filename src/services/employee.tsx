import React from 'react';
import pideAhoraApi from '../api/pideAhoraApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Employee} from '../interfaces/employee';
import {DeliveryService} from './delivery-service';
import {UserServices} from './user-services';
import { InvoiceService } from './invoice-service';

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
      UserServices.employeeId = data[0].id;
      const dataD = await AsyncStorage.getItem('delivery');
      //console.log('delivery:'+dataD);
      if (dataD) {
        DeliveryService.myDelivery = JSON.parse(dataD);
        InvoiceService.invoiceId = JSON.parse(dataD).invoice;
        await DeliveryService.getMyDelivery();
      }
    } else {
      await AsyncStorage.setItem('role', 'cliente');
      UserServices.role = 'cliente';
      UserServices.employeeId = null;
    }
  };
}
