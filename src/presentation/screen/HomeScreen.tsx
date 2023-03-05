import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc'
import Header from '../components/Header'
import ToolBar from '../components/ToolBar'
import Carousel_product from '../components/Carousel_product';
import Slider from '../components/Slider';
import { getPromotionalProducts } from '../../core/api/ProductApi';
import AXIOS from '../../core/api';
import { ScrollView } from 'react-native-gesture-handler';
  
export default function HomeScreen() {

  const [promotional, setPromotional] = useState([]);
  const [topProduct, setTopProduct] = useState([]);

  const getPromotionalProducts = async () => {
    try {
        const res = await AXIOS.get(`product/promotional`);
        setPromotional(res.data)
    } catch (error) {
        return error;
    }
  }

  const getTopProducts = async () => {
    try {
        const res = await AXIOS.get(`product/top`);
        setTopProduct(res.data)
    } catch (error) {
        return error;
    }
  }

  useEffect(() => {
    getPromotionalProducts();
    getTopProducts();
  }, []);

  return (
    <ScrollView>
      <Header />
      <View>
        <Text style={tw`text-black text-xl font-semibold pl-2`}>
          Promotional products
        </Text>
      </View>
      <Carousel_product item={promotional}/>
      <Slider />
      <View>
        <Text style={tw`text-black text-xl font-semibold pl-2`}>
          Lasted products
        </Text>
      </View>
      <Carousel_product item={topProduct}/>
    </ScrollView>
  );
}
