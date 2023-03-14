import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from '../theme/app-theme';
import {InvoiceDetail} from '../interfaces/invoice-detail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product} from '../interfaces/product';
import {InvoiceService} from '../services/invoice-service';
import {DeliveryService} from '../services/delivery-service';
import {UserServices} from '../services/user-services';

interface Props extends StackScreenProps<any, any> {}

export const BillingScreen = ({route, navigation}: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [subTotal, setSubTotal] = React.useState(0);
  const [delivery_commission, setDelivery_commission] = React.useState(1.5);
  const listBilling: InvoiceDetail[] = [];
  getCarProducts();

  //---------------------------- FUNCTIONS ----------------------------
  //obtener el carrito de compras
  async function getCarProducts() {
    let aux: number = 0;
    try {
      const list = await AsyncStorage.getItem('CarProducts');
      if (list) {
        JSON.parse(list).map((item: InvoiceDetail) => {
          listBilling.push(item);
          aux += item.total * item.product.unit_price;
        });
      }
      setSubTotal(aux);
      return listBilling;
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

  //elimina un producto del carrito de compras
  async function deleteProduct(product: Product) {
    Alert.alert(
      'Eliminar producto (' + product.name + ')',
      'Desear eliminar el producto del carrito de compras',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => {
            setRefreshing(true);
            InvoiceService.deleteProduct(product);
            getCarProducts().finally(() => setRefreshing(false));
            //console.log(listBilling);
          },
        },
      ],
    );
  }

  //realiza el pedido
  async function makeOrder() {
    Alert.alert('Realizar pedido', '¿Desear realizar el pedido?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Aceptar',
        onPress: async () => {
          setRefreshing(true);
          const date = new Date();
          const formatDate =
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear();
          const total: number = subTotal + delivery_commission;
          const invoice_detail: InvoiceDetail[] = listBilling;
          const data = await InvoiceService.makeOrder({
            invoice_detail,
            delivery_commission,
            total,
            date,
          });
          if (data) {
            Alert.alert(
              'Pedido realizado',
              'Su pedido se realizo correctamente',
              [
                {
                  text: 'Aceptar',
                  onPress: async () => {
                    getCarProducts().finally(() => setRefreshing(false));
                    await DeliveryService.getMyDeliveries();
                    navigation.navigate('DeliveryHistoryScreen');
                  },
                },
              ],
            );
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      {/* ---------------------------- HEADER ---------------------------- */}
      <View style={styles.header}>
        {/* ------- HOME ------- */}
        <View style={styles.withSection}>
          <TouchableOpacity
            style={styles.btnSection}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Image
              source={require('../assets/iconHome.png')}
              style={styles.imgBtnSection}
            />
          </TouchableOpacity>
        </View>
        {/* ------- TITLE ------- */}
        <View style={styles.searchSection}>
          <Text style={style.titleHeader}>Facturación</Text>
        </View>
      </View>
      {/* ---------------------------- BODY ---------------------------- */}
      <View style={style.body}>
        {/* ------- ADDRESS ------- */}
        <View style={style.containerAddress}>
          <Text style={style.textAddress}>
            {/* ICON */}
            <Image
              source={require('../assets/pin.png')}
              style={style.iconInfo}
            />{' '}
            {UserServices.user?.address}
          </Text>
        </View>
        {/* TITLES INVOICE */}
        <View style={style.containerTitlesBilling}>
          <Text style={style.textTitleLot}>Nº</Text>
          <Text style={style.textTitleNameProduct}>NOMBRE</Text>
          <Text style={style.textTitlePriceUnit}>PRECIO/U</Text>
          <Text style={style.textTitleTotalProduct}>TOTAL</Text>
        </View>
        {/* ------- LIST BILLING ------- */}
        <FlatList
          style={style.list}
          data={listBilling}
          renderItem={({item}) => (
            //INVOICE
            <TouchableOpacity onPress={() => deleteProduct(item.product)}>
              <View style={style.containerProduct}>
                <Text style={style.textLot}>{item.total}</Text>
                <Text style={style.textNameProduct}>{item.product.name}</Text>
                <Text style={style.textPriceUnit}>
                  $ {(item.product.unit_price * 1).toFixed(2)}
                </Text>
                <Text style={style.textTotalProduct}>
                  $ {(item.total * item.product.unit_price).toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} />}
        />
        {/* --- BUTTON ADD --- */}
        <View style={style.containerBtn}>
          <View style={style.containerFooterBilling}>
            <View style={style.containerRowFooter}>
              <Text style={style.textDeliver}>SubTotal:</Text>
              <Text style={style.textPriceDeliver}>
                $ {subTotal.toFixed(2)}
              </Text>
            </View>
            <View style={style.containerRowFooter}>
              <Text style={style.textDeliver}>Costo de envió:</Text>
              <Text style={style.textPriceDeliver}>
                $ {delivery_commission.toFixed(2)}
              </Text>
            </View>
            <View style={style.containerRowFooter}>
              <Text style={style.textTotal}>Total:</Text>
              <Text style={style.textPriceTotal}>
                $ {(subTotal + delivery_commission).toFixed(2)}
              </Text>
            </View>
          </View>

          <Text style={style.textNote}>
            El tiempo aproximado para que llegue su entrega es de{' '}
            <Text
              style={{
                fontWeight: 'bold',
              }}>
              30 minutos
            </Text>
            .
          </Text>
          <TouchableOpacity
            style={style.btnAddProduct}
            onPress={() => makeOrder()}>
            <Text style={style.textBtn}>Realizar pedido </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

/* ---------------------------- STYLES ---------------------------- */
const style = StyleSheet.create({
  titleHeader: {
    fontSize: 17,
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
    fontSize: 18,
    //backgroundColor: 'red',
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  containerTitlesBilling: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerProduct: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  containerAddress: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  textAddress: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#000',
  },
  iconInfo: {
    width: 16,
    height: 16,
    marginHorizontal: 5,
  },
  textTitleNameProduct: {
    width: '55%',
    fontWeight: 'bold',
  },
  textTitleLot: {
    width: '10%',
    fontWeight: 'bold',
  },
  textTitlePriceUnit: {
    width: '20%',
    fontWeight: 'bold',
  },
  textTitleTotalProduct: {
    width: '15%',
    fontWeight: 'bold',
  },
  textNameProduct: {
    width: '55%',
    //fontWeight: 'bold',
  },
  textLot: {
    width: '10%',
    fontWeight: 'bold',
  },
  textPriceUnit: {
    width: '20%',
    //fontWeight: 'bold',
  },
  textTotalProduct: {
    width: '15%',
    fontWeight: 'bold',
  },
  containerBtn: {
    width: '100%',
    marginVertical: 15,
    //backgroundColor: 'green',
  },
  btnAddProduct: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: '#c0392b',
  },
  textBtn: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'white',
  },
  containerFooterBilling: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  containerRowFooter: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  textSubTotal: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    //fontWeight: 'bold',
    width: '70%',
    fontSize: 16,
  },
  textPriceSubTotal: {
    //textTransform: 'uppercase',
    fontFamily: 'Roboto',
    //fontWeight: 'bold',
    width: '30%',
    textAlign: 'right',
    fontSize: 16,
  },
  textDeliver: {
    //textTransform: 'uppercase',
    fontFamily: 'Roboto',
    //fontWeight: 'bold',
    width: '70%',
    fontSize: 16,
  },
  textPriceDeliver: {
    //textTransform: 'uppercase',
    fontFamily: 'Roboto',
    //fontWeight: 'bold',
    width: '30%',
    textAlign: 'right',
    fontSize: 16,
  },
  textTotal: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    width: '70%',
    fontSize: 20,
  },
  textPriceTotal: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    width: '30%',
    textAlign: 'right',
    fontSize: 20,
    //color: 'red',
  },
  textNote: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'red',
    textAlign: 'center',
  },
});
