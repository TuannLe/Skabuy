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
  const [allCategory, setAllCategory] = useState([]);

  const getPromotionalProducts = async () => {
    try {
      const res = await AXIOS.get(`product/promotional`);
      setPromotional(res.data)
    } catch (error) {
      return error;
    }
  }

  const getAllCategory = async () => {
    try {
      const res = await AXIOS.get(`category/all`);
      setAllCategory(res.data.data)
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
    getAllCategory();
  }, []);

  return (
    <ScrollView>
      <Header />
      <View>
        <Text style={tw`text-black text-xl font-semibold pl-2`}>
          Promotional products
        </Text>
      </View>
      <Carousel_product item={promotional} />
      <Slider item={image_banner} />
      <View style={tw`bg-white pt-5`}>
        <Text style={tw`text-black text-2xl font-semibold pl-2 text-center`}>
          Categories
        </Text>
      </View>
      <View style={tw`w-full flex-row flex-wrap p-5 bg-white`}>

        {allCategory.map((category, index) => {
          return (
            <View style={tw`w-1/3 p-2`}>
              <View style={tw`flex-1 items-center`}>
                <Image
                  source={{ uri: category.category_image }}
                  style={tw`w-23 h-23`}
                  resizeMode={'contain'}
                />
                <Text style={tw`text-center text-black font-bold`}>{category.category_name}</Text>
              </View>
            </View>
          );
        })
        }

      </View>

      <View>
        <Text style={tw`text-black text-xl font-semibold pl-2`}>
          Lasted products
        </Text>
      </View>
      <Carousel_product item={topProduct} />
    </ScrollView>
  );
}
