import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc'
import Header from '../components/Header'
import ToolBar from '../components/ToolBar'
import Carousel_product from '../components/Carousel_product';
import Slider from '../components/Slider';
import { getPromotionalProducts } from '../../core/api/ProductApi';
import AXIOS from '../../core/api';
import { ScrollView } from 'react-native-gesture-handler';

const image_banner = [
  'https://skabuy.com/banners/banner_1.jpg',
  'https://skabuy.com/banners/banner_2.jpg',
  'https://skabuy.com/banners/banner_3.jpg'
]
  
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
  
  const getProductBySlug = async (slug : any) => {
    try {
        const res = await AXIOS.get(`product/get-product-by-slug/` + slug);
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
      <Slider item={image_banner}/>
      <View>
        <Text style={tw`text-black text-2xl font-semibold pl-2 text-center`}>
          Categories
        </Text>
      </View>
      <View style={tw`w-full flex-row flex-wrap p-5 bg-white`}>

        <View style={tw`w-1/3`}>
          <View style={tw`flex-1 justify-center text-center`}>
            <Image
              source={{ uri: "https://skabuy.com/Upload/ImageProduct/product_1673341725259.png" }}
              style={tw`w-30 h-30`}
              resizeMode={'contain'}
            />
          </View>
        </View>

      </View>
     
      <View>
        <Text style={tw`text-black text-xl font-semibold pl-2`}>
          Lasted products
        </Text>
      </View>
      <Carousel_product item={topProduct}/>
    </ScrollView>
  );
}
