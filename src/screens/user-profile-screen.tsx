import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {RootStackParams} from '../navigator/stack-navigator';
import {styles} from '../theme/app-theme';
import {UserServices} from '../services/user-services';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props
  extends StackScreenProps<RootStackParams, 'UserProfileScreen'> {}

export const UserProfileScreen = ({navigation}: Props) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'Perfil de ' + UserServices.user?.name,
    });
  });

  //---------------------------- FUNCTIONS ----------------------------
  function logout() {
    Alert.alert('Cerrar sección', '¿Desea cerrar sección?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Aceptar',
        onPress: async () => {
          AsyncStorage.removeItem('x-access-token').finally(() => {
            AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{name: 'LoginScreen'}],
            });
          });
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      {/* ---------------------------- HEADER ---------------------------- */}
      <View style={style.header}>
        {/* ------- HOME ------- */}
        <View style={styles.withSection}>
          <TouchableOpacity
            style={styles.btnSection}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Image
              source={require('../assets/iconHome.png')}
              style={style.imgBtnSection}
            />
          </TouchableOpacity>
        </View>
        {/* ------- TITLE ------- */}
        <View style={styles.searchSection}>
          <Text style={style.titleHeader}> Mi Perfil</Text>
        </View>
        {/* ------- SECTION 3 ------- */}
        <View style={styles.withSection}></View>
      </View>
      {/* ---------------------------- BODY ---------------------------- */}
      <ScrollView style={style.scroll}>
        <View style={style.containerTopBody}></View>
        <View style={style.body}>
          {/* ------- USER IMAGE ------- */}
          <View style={style.containerImgUser}>
            <Image
              style={style.imageUser}
              source={require('../assets/iconUserRegister.png')}
              // source={{
              //   uri: user.image_url,
              // }}
            />
          </View>
          {/* ------- MANE ------- */}
          <Text style={style.tetBold}> {UserServices.user?.name}</Text>
          {/* ------- EMAIL ------- */}
          <Text style={style.text}> {UserServices.user?.email}</Text>
          {/* ---------------------------- ACTIONS ---------------------------- */}
          <View style={style.containerActions}>
            {/* ------- BillS ------- */}
            <View style={style.containerBtnActions}>
              <TouchableOpacity
                style={style.btnActions}
                onPress={() => navigation.navigate('BillingScreen')}>
                <Image
                  source={require('../assets/iconBills.png')}
                  style={style.imgBtnActions}
                />
              </TouchableOpacity>
              <Text> Factura </Text>
            </View>
            {/* ------- DELIVER ------- */}
            <View style={style.containerBtnActions}>
              <TouchableOpacity
                style={style.btnActions}
                onPress={() => navigation.navigate('DeliveryHistoryScreen')}>
                <Image
                  source={require('../assets/iconDeliveries.png')}
                  style={style.imgBtnActions}
                />
              </TouchableOpacity>
              <Text> Pedidos </Text>
            </View>
            {/* ------- LOCATION ------- */}
            <View style={style.containerBtnActions}>
              <TouchableOpacity
                style={style.btnActions}
                onPress={() => navigation.navigate('LocationSelectionScreen')}>
                <Image
                  source={require('../assets/iconLocation.png')}
                  style={style.imgBtnActions}
                />
              </TouchableOpacity>
              <Text> Ubicación </Text>
            </View>
            {/* ------- ORDER ------- */}
            {UserServices.role === 'administrador' ? (
              <View style={style.containerBtnActions}>
                <TouchableOpacity
                  style={style.btnActions}
                  onPress={() => navigation.navigate('OrderScreen')}>
                  <Image
                    source={require('../assets/iconDeliveriesMade.png')}
                    style={style.imgBtnActions}
                  />
                </TouchableOpacity>
                <Text> Entregas </Text>
              </View>
            ) : null}
            {/* ------- LOGOUT ------- */}
            <View style={style.containerBtnActions}>
              <TouchableOpacity style={style.btnLogout} onPress={logout}>
                <Image
                  source={require('../assets/iconLogout.png')}
                  style={style.imgBtnActions}
                />
              </TouchableOpacity>
              <Text> Salir </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#8e44ad',
    elevation: 50,
    borderBottomWidth: 0.1,
    flexDirection: 'row',
  },
  imgBtnSection: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  titleHeader: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'white',
  },
  scroll: {
    width: '100%',
    height: '100%',
    //backgroundColor: 'red',
  },
  containerTopBody: {
    width: '100%',
    height: 80,
    backgroundColor: '#8e44ad',
    position: 'absolute',
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    height: '100%',
  },
  containerImgUser: {
    paddingTop: 20,
    alignItems: 'center',
  },
  imageUser: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#faebd7',
    backgroundColor: '#99a3a4',
  },
  tetBold: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    paddingVertical: 5,
    fontSize: 20,
    textAlign: 'center',
  },
  containerActions: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //backgroundColor: 'red',
  },
  containerBtnActions: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActions: {
    width: 60,
    height: 60,
    padding: 10,
    backgroundColor: '#8e44ad',
    borderRadius: 10,
  },
  btnLogout: {
    width: 60,
    height: 60,
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
  },
  imgBtnActions: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
});
