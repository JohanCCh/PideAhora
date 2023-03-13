import React from 'react';
import {Product} from '../interfaces/product';
import pideAhoraApi from '../api/pideAhoraApi';

export class ProductServices extends React.Component {
  //lista de productos de la tienda
  static products: Product[] = [];

  //obtener lista de productos
  static getProducts = async (): Promise<Product[]> => {
    const {data}: any = await pideAhoraApi.get<Product[]>('/products');
    //console.log(data);
    ProductServices.products = data;
    return data;
  };
}
