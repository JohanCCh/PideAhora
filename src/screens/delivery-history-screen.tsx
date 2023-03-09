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
import {DeliveryService} from '../services/delivery-service';

interface Props extends StackScreenProps<any, any> {}

export const DeliveryHistoryScreen = ({route, navigation}: Props) => {
  const listDeliveries = DeliveryService.getDelivery();

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
          <Text style={style.titleHeader}>Mis Pedidos</Text>
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
        {/* ------- LIST INVOICE ------- */}
        <FlatList
          style={style.list}
          data={listDeliveries}
          renderItem={({item}) => (
            // INVOICE
            <View
              style={
                !item.is_delivered
                  ? style.containerInvoiceNoDelivered
                  : style.containerInvoiceDelivered
              }>
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
                <Text style={style.text}>{item.date_delivery}</Text>
              </View>
              {/* SECTION END */}
              <View style={style.sectionEnd}>
                <Text style={style.text}>
                  {!item.is_delivered ? 'No Entregado' : 'Entregado'}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
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
  containerInvoiceDelivered: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    marginVertical: 10,
  },
  containerInvoiceNoDelivered: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    marginVertical: 10,
  },
  sectionStart: {
    width: '15%',
    //backgroundColor: 'red',
  },
  sectionMiddle: {
    width: '65%',
    //backgroundColor: 'blue',
  },
  sectionEnd: {
    width: '20%',
  },
  imageIcon: {
    width: 50,
    height: 50,
    tintColor: 'white',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
