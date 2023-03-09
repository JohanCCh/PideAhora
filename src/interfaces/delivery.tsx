import {Invoice} from './invoice';

export interface Delivery {
  id: string;
  is_delivered: boolean;
  invoice: Invoice;
  date: Date;
}
