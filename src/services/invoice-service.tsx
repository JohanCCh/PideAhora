import React from 'react';
import {Alert} from 'react-native';
import {Product} from '../interfaces/product';
import {EmployeeService} from './employee';
import {ProductServices} from './product-service';
import {UserServices} from './user-services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InvoiceDetail} from '../interfaces/invoice-detail';
import {Invoice, InvoiceResponse} from '../interfaces/invoice';
import pideAhoraApi from '../api/pideAhoraApi';
import {DeliveryService} from './delivery-service';

export class InvoiceService extends React.Component {
  //añade un producto al carrito de compras
  static addProduct = async (product: Product, amount: number) => {
    let confirm: boolean = false;
    const listData: InvoiceDetail[] = [];
    try {
      const list = await AsyncStorage.getItem('CarProducts');
      if (list) {
        JSON.parse(list).map((item: InvoiceDetail) => {
          if (item.product.id == product.id) {
            Alert.alert(
              'Producto existente en el carrito',
              'Se reemplazara con la nueva cantidad',
              [
                {
                  text: 'Aceptar',
                  onPress: () => {
                    confirm = true;
                    listData.push({
                      product: product,
                      total: amount,
                    });
                  },
                },
              ],
            );
          } else {
            listData.push(item);
          }
        });
      }
      if (!confirm) {
        listData.push({
          product: product,
          total: amount,
        });
      }
      await AsyncStorage.setItem('CarProducts', JSON.stringify(listData));
      //console.log('Guardar producto');
      //console.log(listData);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  //elimina un producto del carrito de compras
  static deleteProduct = async (product: Product) => {
    const listData: InvoiceDetail[] = [];
    try {
      const list = await AsyncStorage.getItem('CarProducts');
      if (list) {
        JSON.parse(list).map((item: InvoiceDetail) => {
          if (item.product.id != product.id) {
            listData.push(item);
          }
        });
      }
      await AsyncStorage.setItem('CarProducts', JSON.stringify(listData));
      //console.log('Eliminar producto');
      //console.log(listData);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  //realiza el pedido
  static makeOrder = async ({
    invoice_detail,
    delivery_commission,
    total,
    date,
  }: Invoice) => {
    let safeCreate: boolean = true;
    const {data} = await pideAhoraApi.post<InvoiceResponse>('/invoices', {
      delivery_commission,
      total,
      date,
    });
    //console.log(data);
    const invoice = data.body.invoice.id;
    DeliveryService.createDelivery(invoice, date);
    if (data) {
      invoice_detail!.map(async (item: InvoiceDetail) => {
        const product = item.product.id;
        const quantity: number = item.total;
        const {data}: any = await pideAhoraApi.post<InvoiceDetail>(
          '/invoice_details',
          {
            invoice,
            product,
            quantity,
          },
        );
        if (!data.id) {
          safeCreate = false;
        }
      });
    }
    if (safeCreate) await AsyncStorage.removeItem('CarProducts');
    return safeCreate;
  };
}
