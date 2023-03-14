import { Product } from "./product";

export interface InvoiceDetail {
    id?:number;
    invoice?: number;
    product: Product;
    total: number;    
}

export interface InvoiceDetailResponse {
    id?:number;
    quantity: number;
    name: string;
    unit_price: number;
    unit_measure: string;
}