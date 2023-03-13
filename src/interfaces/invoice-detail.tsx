import { Product } from "./product";

export interface InvoiceDetail {
    id?:number;
    invoice?: number;
    product: Product;
    total: number;    
}