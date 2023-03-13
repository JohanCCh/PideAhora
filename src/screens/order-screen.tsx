import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {styles} from '../theme/app-theme';
import {DeliveryService} from '../services/delivery-service';

interface Props extends StackScreenProps<any, any> {}

export const OrderScreen = ({route, navigation}: Props) => {
  getAllDeliveries();
  const listDeliveries = DeliveryService.listAllDeliveries;
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedDelivery, setSelectedDelivery] = React.useState(false);
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
  }

  //alterar vista de la lista
  const alterView = () => {
    setSelectedDelivery(!selectedDelivery);
  };

  //seleccionar una entrega
  const selectDelivery = async (id: number) => {
    await DeliveryService.selectDelivery(id);
    onRefresh();
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
          <View style={style.containerChange}>
            <Text>{!DeliveryService.myDelivery?.invoice}</Text>
          </View>
        )}
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
});
