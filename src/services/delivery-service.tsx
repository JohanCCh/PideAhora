import React from 'react';
import pideAhoraApi from '../api/pideAhoraApi';
import { Delivery, DeliveryResponse } from '../interfaces/delivery';
import {InvoiceService} from './invoice-service';

export class DeliveryService extends React.Component {
  //lista de mis pedidos
  static listDeliveries: Delivery[] = []; 

  //lista de todas las entregas
  static listAllDeliveries: Delivery[] = [];

  //crear una entrega
  static createDelivery = async (invoice: string, date: Date) => {
    const is_delivered = false;
    const {data} = await pideAhoraApi.post<DeliveryResponse>('/deliveries', {
      is_delivered,
      invoice,
      date,
    });
    //console.log(data);
  };

  //obtener mis pedidos
  static getMyDeliveries = async (): Promise<Delivery[]> => {
    const {data} = await pideAhoraApi.get<Delivery[]>('/deliveries/mydeliveries');
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
  }
}
