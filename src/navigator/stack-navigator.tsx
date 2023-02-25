import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {BillingScreen} from '../screens/billing-screen';
import {OrderScreen} from '../screens/order-screen';
import {DeliveryHistoryScreen} from '../screens/delivery-history-screen';
import {HomeScreen} from '../screens/home-screen';
import {LoginScreen} from '../screens/login-screen';
import {DeliveryWaitingScreen} from '../screens/delivery-waiting-screen';
import {ProductSearchScreen} from '../screens/product-search-screen';
import {UserProfileScreen} from '../screens/user-profile-screen';
import {UserRegisterScreen} from '../screens/user-register-screen';
import {ErrorMessageScreen} from '../screens/error-message-screen';
import {User} from '../interfaces/user';
import { LocationSelectionScreen } from '../screens/location-selection-screen';
import { ProductDetailScreen } from '../screens/product-detail-screen';
import { Product } from '../interfaces/product';

export type RootStackParams = {
  BillingScreen: undefined;
  OrderScreen: undefined;
  DeliveryHistoryScreen: undefined;
  HomeScreen: undefined;
  LoginScreen: undefined;
  DeliveryWaitingScreen: undefined;
  ProductSearchScreen: undefined;
  UserProfileScreen: User;
  UserRegisterScreen: undefined;
  ErrorMessageScreen: undefined;
  LocationSelectionScreen: undefined;
  ProductDetailScreen: Product;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName="LoginScreen"
      initialRouteName='LoginScreen'
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name="BillingScreen"
        options={{title: 'Facturación'}}
        component={BillingScreen}
      />
      <Stack.Screen
        name="OrderScreen"
        options={{title: 'Pedidos de productos'}}
        component={OrderScreen}
      />
      <Stack.Screen
        name="DeliveryHistoryScreen"
        options={{title: 'Historial de entregas'}}
        component={DeliveryHistoryScreen}
      />
      <Stack.Screen
        name="ErrorMessageScreen"
        options={{title: 'Mensaje de error'}}
        component={ErrorMessageScreen}
      />
      <Stack.Screen
        name="HomeScreen"
        options={{title: 'Inicio'}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="LoginScreen"
        options={{title: 'Inicio de sesión'}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="DeliveryWaitingScreen"
        options={{title: 'Página de espera'}}
        component={DeliveryWaitingScreen}
      />
      <Stack.Screen
        name="ProductSearchScreen"
        options={{title: 'Pagina de búsqueda'}}
        component={ProductSearchScreen}
      />
      <Stack.Screen
        name="ProductDetailScreen"
        options={{title: 'Detalle del producto'}}
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name="UserProfileScreen"
        options={{title: 'Perfil de usuario'}}
        component={UserProfileScreen}
      />
      <Stack.Screen
        name="UserRegisterScreen"
        options={{title: 'Registro de usuario'}}
        component={UserRegisterScreen}
      />
      <Stack.Screen
        name="LocationSelectionScreen"
        options={{title: 'Selection de localización'}}
        component={LocationSelectionScreen}
      />
    </Stack.Navigator>
  );
};
