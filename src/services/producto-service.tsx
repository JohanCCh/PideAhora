import React from 'react';

export class ProductoServices extends React.Component {
  //devuelve lista de productos
  static geListProducts = () => {
    return [
      {
        id: 1,
        name: 'Arroz Carmita',
        stock: 50,
        unit_price: 0.6,
        unit_measure: 'libra',
        category: 'Granos',
        total_purchases: 10,
        date_expiration: '2021-03-18',
        image_url:
          'http://www.netflexweb.com.br/app/Netflex/clientes/netflexv8_108/upload/20160318165751_YXJyb3pQYXJib2lsaXphZG9Wb0Nhcm1pdGE1a2dGb3JhRGVUaXBvXzAyLnBuZw.png',
      },
      {
        id: 2,
        name: 'Coca cola 1lt',
        stock: 35,
        unit_price: 1.25,
        unit_measure: 'unidad',
        category: 'Bebidas',
        total_purchases: 30,
        date_expiration: '2021-02-25',
        image_url:
          'https://e7.pngegg.com/pngimages/328/478/png-clipart-coca-cola-coca-cola.png',
      },
      {
        id: 3,
        name: 'Galletas amor medianas de vainilla',
        stock: 55,
        unit_price: 1.1,
        unit_measure: 'unidad',
        category: 'Galletas',
        total_purchases: 15,
        date_expiration: '2021-03-01',
        image_url:
          'https://www.confiteriaminerva.com/wp-content/uploads/AMOR.100.VAINILLA.png',
      },
      {
        id: 4,
        name: 'Galletas amor medianas de chocolate',
        stock: 35,
        unit_price: 1.1,
        unit_measure: 'unidad',
        category: 'Galletas',
        total_purchases: 5,
        date_expiration: '2021-07-11',
        image_url:
          'http://cdn.shopify.com/s/files/1/0687/0745/1169/products/Picsart_22-12-08_17-32-45-110.png?v=1671244678',
      },
      {
        id: 5,
        name: 'Galletas amor grande de fresa',
        stock: 65,
        unit_price: 1.75,
        unit_measure: 'unidad',
        category: 'Galletas',
        total_purchases: 25,
        date_expiration: '2021-05-11',
        image_url:
          'https://www.surtimovil.com/wp-content/uploads/2020/07/Galletas-Amor-Fresa-175-g-1.png',
      },
      {
        id: 6,
        name: 'Aceite 1lt',
        stock: 45,
        unit_price: 1.5,
        unit_measure: 'unidad',
        category: 'aceites',
        total_purchases: 35,
        date_expiration: '2021-04-10',
        image_url:
          'https://almacenesarcos.com/wp-content/uploads/2021/11/1156-ACEITE-PALMA-DE-ORO-BOTELLA-900-CC.jpg',
      },
      {
        id: 7,
        name: 'Azúcar 1kg',
        stock: 15,
        unit_price: 0.99,
        unit_measure: 'unidad',
        category: 'azúcar',
        total_purchases: 23,
        date_expiration: '2021-05-01',
        image_url:
          'https://www.laespanola.com.ec/images/thumbs/0003568_azucar-blanca-san-carlos-1-kg.png',
      },
      {
        id: 8,
        name: 'Sal 1kg',
        stock: 41,
        unit_price: 1.15,
        unit_measure: 'unidad',
        category: 'sal',
        total_purchases: 38,
        date_expiration: '2021-06-12',
        image_url:
          'https://elahorro.com.ec/web/image/product.template/88998/image',
      },
    ];
  };
}
