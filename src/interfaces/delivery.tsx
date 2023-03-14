import {InvoiceOrder} from './invoice';

export interface Delivery {
  id: string;
  is_delivered: boolean;
  employee?: string;
  invoice: InvoiceOrder;
  date: Date;
  address: string;
}

export interface DeliveryResponse {
  message: string;
  body: {
    delivery: Delivery;
  }
}
