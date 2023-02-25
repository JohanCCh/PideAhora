import { Product } from "./product";

export interface InvoiceDetail {
    id:string;
    product: Product;
    total: number;    
}