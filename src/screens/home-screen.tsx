import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import {styles} from '../theme/app-theme';
import {StackScreenProps} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ProductServices} from '../services/product-service';

interface Props extends StackScreenProps<any, any> {}

export const HomeScreen = ({navigation}: Props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  getAllProducts();
  let listProducts = ProductServices.products;
  const [searchProduct, onChangeSearchProduct] = React.useState('');
  const timeArrival: number = 30;
  const shippingType = 'Envío $ 0.99';

  //---------------------------- FUNCTIONS --------------------------------
  //refrescar la pantalla
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllProducts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  navigation.addListener('focus', () => {
    onRefresh();
  });

  //limpiar el campo de búsqueda
  function clearSearch() {
    onChangeSearchProduct('');
  }

  //obtener productos
  async function getAllProducts() {
    await ProductServices.getProducts();
  }

  return (
    <View style={styles.container}>
      {/* ---------------------------- HEADER ---------------------------- */}
      <View style={styles.header}>
        {/* ------- USER ------- */}
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
          <TextInput
            style={styles.inputSearch}
            onChangeText={text => onChangeSearchProduct(text)}
            value={searchProduct}
            placeholder="Buscar producto"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.btnSection} onPress={clearSearch}>
            {searchProduct == '' ? (
              <Image
                style={styles.ImageBtnSearch}
                source={require('../assets/iconSearch.png')}
              />
            ) : (
              <Image
                style={styles.ImageBtnSearch}
                source={require('../assets/clear.png')}
              />
            )}
          </TouchableOpacity>
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
      <View style={style.body}>
        {/* ------- LIST PRODUCTOS ------- */}
        <FlatList
          style={style.list}
          data={
            searchProduct != ''
              ? listProducts.filter(product =>
                  product.name.includes(searchProduct),
                ).length == 0
                ? listProducts.filter(product =>
                    product.category.includes(searchProduct),
                  )
                : listProducts.filter(product =>
                    product.name.includes(searchProduct),
                  )
              : listProducts
          }
          renderItem={({item}) => (
            // ---- PRODUCT ----
            <TouchableOpacity
              style={style.itemProduct}
              onPress={() => navigation.navigate('ProductDetailScreen', item)}>
              <View style={style.sectionStart}>
                <Image
                  style={style.imageProduct}
                  source={{
                    uri: item.image_url,
                  }}
                />
              </View>
              <View style={style.sectionMiddle}>
                <Text style={style.titleProduct}>{item.name}</Text>
                <Text style={style.descriptionProduct}>
                  {timeArrival} min - {shippingType}
                </Text>
              </View>
              <View style={style.sectionEnd}>
                <Text style={style.textStock}> u {item.stock}</Text>
              </View>
              <View style={style.sectionEnd}>
                <Text style={style.textPrice}>
                  {' '}
                  $ {(item.unit_price * 1).toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

// --------------------------------- STYLES ---------------------------------
const style = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
    fontSize: 18,
    //backgroundColor: 'red',
  },
  list: {
    paddingHorizontal: 20,
  },
  itemProduct: {
    alignItems: 'center',
    flexDirection: 'row',
    //borderWidth: 0.5,
    borderBottomWidth: 0.5,
    //borderBottomEndRadius: 10,
    //borderTopEndRadius: 10,
    padding: 10,
    marginVertical: 5,
    //backgroundColor: '#3380ff',
  },
  sectionStart: {
    width: '20%',
    //backgroundColor: 'red',
  },
  sectionMiddle: {
    width: '50%',
    //backgroundColor: 'green',
  },
  sectionEnd: {
    width: '15%',
    //backgroundColor: 'blue',
  },
  textPrice: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  textStock: {
    fontFamily: 'Roboto',
    //fontWeight: 'bold',
    textAlign: 'left',
  },
  titleProduct: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  descriptionProduct: {
    fontFamily: 'Roboto',
    textAlign: 'left',
  },
  imageProduct: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 0.1,
    borderColor: 'black',
    alignContent: 'center',
    backgroundColor: '#ffffff',
  },
});
