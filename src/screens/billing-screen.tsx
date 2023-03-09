import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from '../theme/app-theme';
import { InvoiceService } from '../services/invoice-service';

interface Props extends StackScreenProps<any, any> {}

export const BillingScreen = ({route, navigation}: Props) => {
  const listBilling: any = InvoiceService.getProduct();

  console.log(listBilling);

  //---------------------------- FUNCTIONS ----------------------------

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
            <View style={style.containerProduct}>
              <Text style={style.textLot}>1000</Text>
              <Text style={style.textNameProduct}>{item}</Text>
              <Text style={style.textPriceUnit}>1000</Text>
              <Text style={style.textTotalProduct}>1000</Text>
            </View>
          )}
        />
        {/* --- BUTTON ADD --- */}
        <View style={style.containerBtn}>
          <View style={style.containerFooterBilling}>
            <View style={style.containerRowFooter}>
              <Text style={style.textDeliver}>SubTotal:</Text>
              <Text style={style.textPriceDeliver}>$13.60</Text>
            </View>
            <View style={style.containerRowFooter}>
              <Text style={style.textDeliver}>Costo de envió:</Text>
              <Text style={style.textPriceDeliver}>$1.99</Text>
            </View>
            <View style={style.containerRowFooter}>
              <Text style={style.textTotal}>Total:</Text>
              <Text style={style.textPriceTotal}>$15.59</Text>
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
          <TouchableOpacity style={style.btnAddProduct}>
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
    fontWeight: 'bold',
  },
  textLot: {
    width: '10%',
    fontWeight: 'bold',
  },
  textPriceUnit: {
    width: '20%',
    fontWeight: 'bold',
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
  },
  textNote: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'red',
    textAlign: 'center',
  },
});
