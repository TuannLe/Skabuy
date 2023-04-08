import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc'
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import * as ACT_PRODUCT from '../../core/redux/actions/product'
import * as ACT_AUTH from '../../core/redux/actions/auth'
import Header from '../components/Header'
import Carousel_product from '../components/Carousel_product';
import Slider from '../components/Slider';
import AXIOS from '../../core/api';
import { COLOR, ROUTER } from '../constants';

const image_banner = [
  'https://vietadv.vn/wp-content/uploads/2021/08/banner-quang-cao-scaled.jpg',
  'https://vietadv.vn/wp-content/uploads/2021/08/banner-quang-cao-scaled.jpg',
  'https://vietadv.vn/wp-content/uploads/2021/08/banner-quang-cao-scaled.jpg'
]

export default function HomeScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const token = useSelector((state: any) => state.auth.token)
  const [promotional, setPromotional] = useState([]);
  const [topProduct, setTopProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const getPromotionalProducts = async () => {
    try {
      const res = await AXIOS.get(`product/promotional`);
      setPromotional(res.data.data)
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
      setTopProduct(res.data.data)
    } catch (error) {
      return error;
    }
  }

  const handleGetProductByCategory = (IDCategory: any) => {
    dispatch(ACT_PRODUCT.GetProductByCategoryStart(IDCategory))
    dispatch(ACT_PRODUCT.GetAttributeByCategoryStart(IDCategory))
    navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { IDCategory: IDCategory })
  }

  const getInfoUser = () => {
    if (token != '') {
      dispatch(ACT_AUTH.GetUserStart({ token: JSON.parse(token) }))
    }
  }

  useEffect(() => {
    getInfoUser();
  }, [token])

  useEffect(() => {
    getPromotionalProducts();
    getTopProducts();
    getAllCategory();
  }, []);

  return (
    <ScrollView>
      <Header />
      <Slider item={image_banner} />
      <View style={tw`flex flex-row justify-between items-center px-2 py-3`}>
        <Text style={tw`text-black text-2xl font-semibold`}>
          Promotional products
        </Text>
        <TouchableOpacity
          style={tw`px-2 py-0.5 bg-[#17a2b8ad] rounded-lg`}
        >
          <Text style={tw`text-base text-[${COLOR.WHITE}]`}>View all</Text>
        </TouchableOpacity>
      </View>
      <Carousel_product item={promotional} />
      {/* <View style={tw`bg-white pt-5`}>
        <Text style={tw`text-black text-2xl font-semibold pl-2 text-center`}>
          Categories
        </Text>
      </View> */}
      <View style={tw`w-full flex-row flex-wrap mt-3 p-5 bg-white`}>

        {allCategory.map((category, index) => {
          return (
            <View style={tw`w-1/3 p-2`}>
              <TouchableOpacity
                onPress={() => handleGetProductByCategory(category.category_id)}
                style={tw`flex-1 items-center`}
              >
                <Image
                  source={{ uri: category.category_image }}
                  style={tw`w-23 h-23`}
                  resizeMode={'contain'}
                />
                <Text style={tw`text-center text-black font-bold`}>{category.category_name}</Text>
              </TouchableOpacity>
            </View>
          );
        })
        }

      </View>

      <View style={tw``}>
        <Text style={tw`text-black text-2xl font-semibold py-3`}>
          Lasted products
        </Text>
        <Carousel_product item={topProduct} />
      </View>
    </ScrollView>
  );
}
