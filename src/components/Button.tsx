import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';

interface Props {
  title: string;
  position?: 'br' | 'bl';
  onPress: () => void;
}

export const Button = ({title, position = 'br', onPress}: Props) => {
  return (
    <View
      style={[
        style.btnFabLocation,
        position === 'bl' ? style.left : style.right,
      ]}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple('#28425B', false, 30)}>
        <View style={style.btnFab}>
          <Text style={style.btnFabText}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const style = StyleSheet.create({
  btnFabLocation: {
    position: 'absolute',
    bottom: 25,
  },
  right: {
    right: 25,
  },
  left: {
    left: 25,
  },
  btnFab: {
    backgroundColor: '#5856D6',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 8,
  },
  btnFabText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
