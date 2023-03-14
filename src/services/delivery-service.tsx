import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import pideAhoraApi from '../api/pideAhoraApi';
import {Delivery, DeliveryResponse} from '../interfaces/delivery';
import {InvoiceService} from './invoice-service';
import {UserServices} from './user-services';

export class DeliveryService extends React.Component {
  //lista de mis pedidos
  static listDeliveries: Delivery[] = [];

  //lista de todas las entregas
  static listAllDeliveries: Delivery[] = [];

  //mi entrega
  static myDelivery: Delivery | null = null;

  //crear una entrega
  static createDelivery = async (invoice: string, date: Date) => {
    const is_delivered = false;
    const address = UserServices.user?.address;
    const {data} = await pideAhoraApi.post<DeliveryResponse>('/deliveries', {
      is_delivered,
      invoice,
      date,
      address,
    });
    //console.log(data);
  };

  //obtener mis pedidos
  static getMyDeliveries = async (): Promise<Delivery[]> => {
    const {data} = await pideAhoraApi.get<Delivery[]>(
      '/deliveries/mydeliveries',
    );
    //console.log(data);
    DeliveryService.listDeliveries = data;
    return data;
  };

  //obtener todas las entregas
  static getAllDeliveries = async (): Promise<Delivery[]> => {
    const {data} = await pideAhoraApi.get<Delivery[]>('/deliveries');
    //console.log(data);
    DeliveryService.listAllDeliveries = data;
    return data;
  };

  //seleccionar una entrega
  static selectDelivery = async (id: number) => {
    const {data}: any = await pideAhoraApi.put<Delivery>(
      `/deliveries/select_d/${id}`,
      {
        employee: UserServices.employeeId,
      },
    );
    //console.log(data);
    await AsyncStorage.setItem('delivery', JSON.stringify(data.body.delivery));
    DeliveryService.myDelivery = data.body.delivery;
    InvoiceService.invoiceId = data.body.delivery.invoice;
    await DeliveryService.getMyDeliveries();
    await DeliveryService.getAllDeliveries();
  };

  //actualizar el estado de una entrega
  static updateDeliveryStatus = async (id: number, is_delivered: boolean) => {
    const {data}: any = await pideAhoraApi.put(
      `/deliveries/is_delivered/${id}`,
      {
        is_delivered,
      },
    );
    //console.log(data);
    await DeliveryService.getAllDeliveries();
    await DeliveryService.getMyDeliveries();
  };

  //obtener mi entrega
  static getMyDelivery = async () => {
    //console.log(UserServices.employeeId);
    if (UserServices.employeeId != null) return;
    const id = UserServices.employeeId;
    const {data}: any = await pideAhoraApi.get<Delivery>(
      `/deliveries/myOrder/${id}`,
    );
    //console.log(data);
    if (data[0]) {
      DeliveryService.myDelivery = data[0];
      //console.log(DeliveryService.myDelivery);
    }
  };
}
