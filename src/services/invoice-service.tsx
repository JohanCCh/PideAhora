import React from 'react';
import {Alert} from 'react-native';
import {Product} from '../interfaces/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  InvoiceDetail,
  InvoiceDetailResponse,
} from '../interfaces/invoice-detail';
import {Invoice, InvoiceOrder, InvoiceResponse} from '../interfaces/invoice';
import pideAhoraApi from '../api/pideAhoraApi';
import {DeliveryService} from './delivery-service';

export class InvoiceService extends React.Component {
  //id de la factura del pedido
  static invoiceId: number = 0;

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

  //obtener la factura de mi pedido
  static getMyInvoice = async () => {
    if (DeliveryService.myDelivery?.invoice.name_user != undefined) return;
    const id = InvoiceService.invoiceId;
    //console.log('id:');
    //console.log(id);
    const {data}: any = await pideAhoraApi.get<InvoiceOrder>(`/invoices/${id}`);
    //console.log(data);
    if (data[0] && DeliveryService.myDelivery?.invoice != null) {
      DeliveryService.myDelivery.invoice = data[0];
      //console.log(DeliveryService.myDelivery);
    }
  };

  //obtener el detalle de mi factura
  static getMyInvoiceDetail = async () => {
    //console.log(DeliveryService.myDelivery?.invoice.id);
    if (DeliveryService.myDelivery?.invoice.invoice_detail?.length  != undefined ) return;
    const id = DeliveryService.myDelivery?.invoice.id;
    const {data}: any = await pideAhoraApi.get<InvoiceDetailResponse>(
      `/invoice_details/invoice_detail/${id}`,
    );
    //console.log(data);
    if (data[0] && DeliveryService.myDelivery?.invoice != null) {
      DeliveryService.myDelivery.invoice.invoice_detail = data;
      //console.log(DeliveryService.myDelivery.invoice.invoice_detail);
    }
  };
}
