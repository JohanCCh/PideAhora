import React from 'react';
import { Product } from '../interfaces/product';
import {EmployeeService} from './employee';
import {ProductoServices} from './producto-service';
import {UserServices} from './user-services';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class InvoiceService extends React.Component {
  //devuelve una factura
  static getOneInvoice = () => {
    return [
      {
        id: '1',
        invoice_detail: [
          {
            id: '1',
            product: ProductoServices.getListProducts()['1'],
            total: '2',
          },
          {
            id: '2',
            product: ProductoServices.getListProducts()['2'],
            total: '3',
          },
          {
            id: '1',
            product: ProductoServices.getListProducts()['4'],
            total: '2',
          },
        ],
        employee: EmployeeService.getOneEmployee(),
        user: UserServices.getAllUsers()['1'],
        delivery_commission: '1.5',
        total: '8.35',
        date_generate: new Date('27-03-2021'),
      },
    ];
  };

  //obtiene el carrito de compras
  static getProduct = async () => {
    console.log('Obtener producto');
    const listproduct: Product[] = [];
    try {
      const jsonValue = JSON.parse(
        (await AsyncStorage.getItem('@listMeProducts')) + '',
      );
      console.log(jsonValue.name);
      // jsonValue.map((item: any) => {
      //   console.log(item);
      // });
      return listproduct;
    } catch (e) {
      // error reading value
    }
  };
}
