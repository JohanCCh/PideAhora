import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {styles} from '../theme/app-theme';
import {StackScreenProps} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<any, any> {}

export const ProductSearchScreen = ({navigation}: Props) => {
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
        {/* ------- SEARCH ------- */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.inputSearch}
            placeholder="Buscar producto"
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            style={styles.btnSection}
            onPress={() => navigation.navigate('ProductSearchScreen')}>
            <Image
              style={styles.ImageBtnSearch}
              source={require('../assets/iconSearch.png')}
            />
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
      <ScrollView style={styles.scroll}>
        <View style={styles.body}>
        </View>
      </ScrollView>
    </View>
  );
};

// --------------------------------- STYLES ---------------------------------
const style = StyleSheet.create({
  titleSearchBody: {
    //textTransform: 'uppercase',
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  searchWord: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
});
