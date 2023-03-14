import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from '../theme/app-theme';
import {DeliveryService} from '../services/delivery-service';
import {InvoiceService} from '../services/invoice-service';
import {UserServices} from '../services/user-services';

interface Props extends StackScreenProps<any, any> {}

export const OrderScreen = ({route, navigation}: Props) => {
  try {
    getAllDeliveries();
    const listDeliveries = DeliveryService.listAllDeliveries;
    const [refreshing, setRefreshing] = React.useState(false);
    const [selectedDelivery, setSelectedDelivery] = React.useState(false);
    const [subTotal, setSubTotal] = React.useState(0);
    //console.log(listDeliveries);

    //---------------------------- FUNCTIONS ----------------------------
    //actualiza la lista de entregas
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getAllDeliveries();
      //DeliveryService.myDelivery =  null;
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    //obtener todos los pedidos
    async function getAllDeliveries() {
      await DeliveryService.getAllDeliveries();
      //console.log("order:");
      //console.log(DeliveryService.listAllDeliveries);
      if (DeliveryService.myDelivery != null) {
        InvoiceService.getMyInvoice().then(async () => {
          InvoiceService.getMyInvoiceDetail().then(() => {
            if (DeliveryService.myDelivery?.invoice.invoice_detail != null) {
              sumTotal();
            }
          });
        });
      }
    }

    //sumar el total de un detalle de factura
    const sumTotal = () => {
      if (DeliveryService.myDelivery?.invoice.invoice_detail != null)
        setSubTotal(
          DeliveryService.myDelivery?.invoice.invoice_detail.reduce(
            (acc, item) => acc + item.quantity * item.unit_price,
            0,
          ),
        );
    };

    //entregar pedido
    const deliverOrder = async () => {
      Alert.alert(
        '¿Desea entregar el pedido?',
        'se elidirá este pedido para entregarlo!',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: async () => {
              if (DeliveryService.myDelivery?.id != null) {
                const id = parseInt(DeliveryService.myDelivery?.id);
                await DeliveryService.updateDeliveryStatus(id, true).finally(
                  () => {
                    Alert.alert(
                      'Pedido realizado',
                      'se entrego el pedido correctamente',
                      [
                        {
                          text: 'Aceptar',
                          onPress: () => {
                            DeliveryService.myDelivery = null;
                            navigation.navigate('HomeScreen');
                            onRefresh();
                          },
                        },
                      ],
                    );
                  },
                );
              }
            },
          },
        ],
      );
    };

    //alterar vista de la lista
    const alterView = () => {
      setSelectedDelivery(!selectedDelivery);
    };

    //seleccionar una entrega
    const selectDelivery = async (id: number) => {
      Alert.alert(
        '¿Desea seleccionar esta entrega?',
        'Se seleccionara la entrega!',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: async () => {
              await DeliveryService.selectDelivery(id);
              onRefresh();
            },
          },
        ],
      );
    };

    //dar formato a la fecha
    const formatDate = (data: Date) => {
      if (data != null) {
        const date = new Date(data);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hour = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}-${month}-${year}`;
      }
      return '';
    };

    return (
      <View style={styles.container}>
        {/* ---------------------------- HEADER ---------------------------- */}
        <View style={styles.header}>
          {/* ------- PROFILE ------- */}
          <View style={styles.withSection}>
            <TouchableOpacity
              style={styles.btnSection}
              onPress={() => navigation.navigate('UserProfileScreen')}>
              <Image
                source={require('../assets/iconUser.png')}
                style={styles.imgBtnSection}
              />
            </TouchableOpacity>
          </View>
          {/* ------- SEARCH ------- */}
          <View style={styles.searchSection}>
            <Text style={style.titleHeader}>Entregas</Text>
          </View>
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
        </View>
        {/* ---------------------------- BODY ---------------------------- */}
        <View style={style.body}>
          {/* ------- BUTTONS CHANGE ------- */}
          {DeliveryService.myDelivery != null ? (
            <View style={style.containerChange}>
              {!selectedDelivery ? (
                <TouchableOpacity
                  style={style.btnChange}
                  onPress={() => alterView()}>
                  <Text style={style.textBtn}> Todas las entregas</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={style.btnChange}
                  onPress={() => alterView()}>
                  <Text style={style.textBtn}> Mi entrega</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}
          {/* ------- LIST DELIVERIES ------- */}
          {!selectedDelivery ? (
            <FlatList
              style={style.list}
              data={listDeliveries}
              renderItem={({item}) => (
                // INVOICE
                <View style={style.containerDeliverers}>
                  {/* SECTION START */}
                  <View style={style.sectionStart}>
                    <Image
                      style={style.imageIcon}
                      source={
                        item.is_delivered
                          ? require('../assets/iconBills.png')
                          : require('../assets/iconDeliveriesMade.png')
                      }
                    />
                  </View>
                  {/* SECTION MIDDLE */}
                  <View style={style.sectionMiddle}>
                    <Text style={style.text}>{formatDate(item.date)}</Text>
                  </View>
                  {/* SECTION END */}
                  <View style={style.sectionEnd}>
                    {DeliveryService.myDelivery != null ? null : (
                      <TouchableOpacity
                        style={style.btnAddProduct}
                        onPress={() => selectDelivery(parseInt(item.id))}>
                        <Text style={style.textBtn}>Entregar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : (
            // ------------------------------ ORDER SCREEN ------------------------------
            <View style={style.body}>
              <View style={style.containerAddress}>
                {/* ------- ADDRESS ------- */}
                <Text style={style.textAddress}>
                  {/* ICON */}
                  <Image
                    source={require('../assets/pin.png')}
                    style={style.iconInfo}
                  />{' '}
                  {UserServices.user?.address}
                </Text>
                {/* ------- USER ------- */}
                <Text style={style.textAddress}>
                  {/* ICON */}
                  <Image
                    source={require('../assets/iconUser.png')}
                    style={style.iconInfo}
                  />{' '}
                  {DeliveryService.myDelivery?.invoice.name_user}
                </Text>
                {/* ------- EMPLOYEE ------- */}
                <Text style={style.textAddress}>
                  {/* ICON */}
                  <Image
                    source={require('../assets/box_delivery.png')}
                    style={style.iconInfo}
                  />{' '}
                  {UserServices.user?.name}
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
                style={style.listOrder}
                data={DeliveryService.myDelivery?.invoice.invoice_detail}
                renderItem={({item}) => (
                  <View style={style.containerProduct}>
                    <Text style={style.textLot}>{item.quantity}</Text>
                    <Text style={style.textNameProduct}>{item.name}</Text>
                    <Text style={style.textPriceUnit}>
                      $ {(item.unit_price * 1).toFixed(2)}
                    </Text>
                    <Text style={style.textTotalProduct}>
                      $ {(item.quantity * item.unit_price).toFixed(2)}
                    </Text>
                  </View>
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
                      ${' '}
                      {(
                        parseInt(
                          DeliveryService.myDelivery?.invoice
                            .delivery_commission + '',
                        ) * 1
                      ).toFixed(2)}
                    </Text>
                  </View>
                  <View style={style.containerRowFooter}>
                    <Text style={style.textTotal}>Total:</Text>
                    <Text style={style.textPriceTotal}>
                      ${' '}
                      {(
                        subTotal +
                        parseInt(
                          DeliveryService.myDelivery?.invoice
                            .delivery_commission + '',
                        )
                      ).toFixed(2)}
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
                  onPress={() => deliverOrder()}>
                  <Text style={style.textBtn}> Entregar pedido </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  } catch (error) {
    console.log(error);
  }
};

/* ---------------------------- STYLES ---------------------------- */
const style = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
    fontSize: 18,
    //backgroundColor: 'red',
  },
  titleHeader: {
    fontSize: 17,
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 20,
  },
  listOrder: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  containerChange: {
    paddingHorizontal: 20,
  },
  btnChange: {
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: '#c0392b',
  },
  containerDeliverers: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionStart: {
    width: '15%',
    //backgroundColor: 'red',
  },
  sectionMiddle: {
    width: '50%',
    //backgroundColor: 'blue',
  },
  sectionEnd: {
    width: '35%',
  },
  imageIcon: {
    width: 50,
    height: 50,
    tintColor: 'black',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
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
  // ------------------------------  STYLE ORDER SCREEN ------------------------------
  containerAddress: {
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
  containerTitlesBilling: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  containerProduct: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  containerBtn: {
    width: '100%',
    marginVertical: 15,
    //backgroundColor: 'green',
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
