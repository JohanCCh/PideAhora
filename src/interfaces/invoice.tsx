import {Employee} from './employee';
import {InvoiceDetail} from './invoice-detail';
import {User} from './user';

export interface Invoice {
  id?: string;
  invoice_detail?: InvoiceDetail[];
  employee?: Employee;
  user?: User;
  delivery_commission: number;
  total: number;
  date: Date;
}

export interface InvoiceResponse {
    message: string;
    body: {
        invoice: {
            id: string;
            user_id: string;
            delivery_commission: number;
            total: number;
            date: Date;
        };
    };
}
