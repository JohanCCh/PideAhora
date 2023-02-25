import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/stack-navigator';
import {styles} from '../theme/app-theme';

interface Props
  extends StackScreenProps<RootStackParams, 'ProductDetailScreen'> {}

export const ProductDetailScreen = ({route, navigation}: Props) => {
  const product = route.params;
  const [textQuantity, onChangeTextQuantity] = React.useState('1');

  //---------------------------- FUNCTIONS ----------------------------  
  function onChanged(text: string) {
    onChangeTextQuantity(text.replace(/[^0-9]/g, ''));
    getTotalPrice();
  }

  function getTotalPrice() {
    const result = (product.unit_price * parseInt(textQuantity)).toFixed(2);
    if (result == 'NaN') {
      return '0.00';
    }
    return result;
  }

  function addProduct() {
    navigation.navigate('HomeScreen');
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
          <Text style={style.titleHeader}>Detalle</Text>
        </View>
        {/* ------- BILLING ------- */}
        <View style={styles.withSection}>
          <TouchableOpacity
            style={styles.btnSection}
            onPress={() => navigation.navigate('BillingScreen')}>
            <Image
              source={require('../assets/iconBilling.png')}
              style={styles.imgBtnSection}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* ---------------------------- BODY ---------------------------- */}
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          {/* ------- PRODUCT IMAGE ------- */}
          <View style={style.containerImgProduct}>
            <Image
              style={style.imageProduct}
              source={{
                uri: product.image_url,
              }}
            />
            <Text style={style.textNameProduct}>{product.name}</Text>
            <Text style={style.textPriceProduct}>
              $ {product.unit_price.toFixed(2)}
            </Text>
          </View>
          {/* ------- PRODUCT DETAIL ------- */}
          <View style={style.containerMain}>
            {/* --- PRODUCT QUANTITY --- */}
            <View style={style.containerInput}>
              <TextInput
                style={style.input}
                keyboardType="numeric"
                onChangeText={text => onChanged(text)}
                value={textQuantity}
              />
              <Text style={style.textInput}>{product.unit_measure}</Text>
            </View>
            {/* --- PRODUCT PRICE TOTAL --- */}
            <View style={style.containerTotalPrice}>
              <Text style={style.textInput}>Total: </Text>
              <Text style={style.textInput}>$ {getTotalPrice()}</Text>
            </View>
          </View>
        </ScrollView>
        {/* --- BUTTON ADD --- */}
        <View style={style.containerBtn}>
          <TouchableOpacity style={style.btnAddProduct} onPress={addProduct}>
            <Text style={style.textBtn}>Agregar $ {getTotalPrice()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  titleHeader: {
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  containerImgProduct: {
    paddingTop: 20,
    alignItems: 'center',
  },
  imageProduct: {
    width: 250,
    height: 250,
    borderRadius: 10,
    borderWidth: 0.1,
    borderColor: 'black',
    alignContent: 'center',
    backgroundColor: '#ffffff',
  },
  textNameProduct: {
    fontSize: 17,
    fontFamily: 'Roboto',
    color: 'black',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  textPriceProduct: {
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  containerMain: {
    paddingVertical: 15,
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 5,
    borderTopWidth: 5,
    //backgroundColor: 'green',
    borderColor: '#ffffff',
  },
  containerTotalPrice: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 5,
    //backgroundColor: 'green',
    borderColor: '#ffffff',
  },
  input: {
    width: 150,
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    //backgroundColor: 'red',
  },
  textInput: {
    fontSize: 17,
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
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
});
