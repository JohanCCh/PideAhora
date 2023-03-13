import {Invoice} from './invoice';

export interface Delivery {
  id: string;
  is_delivered: boolean;
  employee?: string;
  invoice: Invoice;
  delivery_date: Date;
}

export interface DeliveryResponse {
  message: string;
  body: {
    delivery: Delivery;
  }
}
