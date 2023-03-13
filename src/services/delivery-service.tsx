import React from 'react';
import pideAhoraApi from '../api/pideAhoraApi';
import { Delivery, DeliveryResponse } from '../interfaces/delivery';
import {InvoiceService} from './invoice-service';

export class DeliveryService extends React.Component {
  //lista de mis entregas
  static listDeliveries: Delivery[] = []; 

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

  //obtener todas mis entregas
  static getMyDeliveries = async (): Promise<Delivery[]> => {
    const {data} = await pideAhoraApi.get<Delivery[]>('/deliveries');
    //console.log(data);
    DeliveryService.listDeliveries = data;
    return data;
  };


  //--------------------------------------------------------------------------------------------------
  //devuelve las entregas q se le realizaron a un usuario
  static getDelivery = () => {
    return [
      {
        id: '1',
        is_delivered: false,
        invoice: InvoiceService.getOneInvoice(),
        date_delivery: '27-03-2021: 16:30',
      },
      {
        id: '2',
        is_delivered: true,
        invoice: InvoiceService.getOneInvoice(),
        date_delivery: '27-03-2021',
      },
      {
        id: '3',
        is_delivered: false,
        invoice: InvoiceService.getOneInvoice(),
        date_delivery: '27-03-2021: 17:25',
      },
      {
        id: '4',
        is_delivered: true,
        invoice: InvoiceService.getOneInvoice(),
        date_delivery: '27-03-2021',
      },
      {
        id: '5',
        is_delivered: true,
        invoice: InvoiceService.getOneInvoice(),
        date_delivery: '27-03-2021',
      },
      {
        id: '6',
        is_delivered: true,
        invoice: InvoiceService.getOneInvoice(),
        date_delivery: '25-03-2021',
      },
      {
        id: '7',
        is_delivered: true,
        invoice: InvoiceService.getOneInvoice(),
        date_delivery: '23-03-2021',
      },
      {
        id: '8',
        is_delivered: true,
        invoice: InvoiceService.getOneInvoice(),
        date_delivery: '20-03-2021',
      },
    ];
  };
}
