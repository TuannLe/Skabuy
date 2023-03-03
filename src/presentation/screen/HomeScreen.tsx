import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc'
import Header from '../components/Header'
import ToolBar from '../components/ToolBar'
import Carousel_product from '../components/Carousel_product';
import Slider from '../components/Slider';

export default function HomeScreen() {
  return (
    <View>
      <Header />
      <Carousel_product />
      <Slider />
    </View>
  );
}
