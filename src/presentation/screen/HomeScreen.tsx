import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc'
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { decode as atob, encode as btoa } from 'base-64'
import * as ACT_PRODUCT from '../../core/redux/actions/product'
import * as ACT_AUTH from '../../core/redux/actions/auth'
import Header from '../components/Header'
import Carousel_product from '../components/Carousel_product';
import Slider from '../components/Slider';
import AXIOS from '../../core/api';
import { getSuperSaleItems } from '../../core/api/ProductApi'
import { COLOR, ROUTER } from '../constants';
import SkeletonItemProduct from '../components/skeleton/SkeletonProductItem';
import SkeletonCategories from '../components/skeleton/SkeletonCategories';

const image_banner = [
  'https://res.cloudinary.com/dwd5gmp97/image/upload/v1678780767/buonxaz1xpy1udyn6gsy.jpg',
  'https://res.cloudinary.com/dwd5gmp97/image/upload/v1678780806/jniwjxytr2yif72cu4mw.jpg',
  'https://res.cloudinary.com/dwd5gmp97/image/upload/v1681177966/cjidvddsja3pw6xpiddr.jpg',
  'https://res.cloudinary.com/dwd5gmp97/image/upload/v1678780851/yvdrnoav7353rv23jcqy.jpg',
  'https://res.cloudinary.com/dwd5gmp97/image/upload/v1678780868/vdnklaytsnex2jpam3df.jpg'
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

  const [superSaleItems, setSuperSaleItems] = useState([])
  const getSuperSaleItem = async () => {
    const data = {
      price: []
    }
    const encode = btoa(JSON.stringify(data))
    console.log(encode)
    const response = await getSuperSaleItems(encode)
    if (response.status === 'success') {
      setSuperSaleItems(response.data)
    }
  }

  const handleGetProductByCategory = (IDCategory: any, NameCategory: any) => {
    dispatch(ACT_PRODUCT.GetProductByCategoryStart(IDCategory))
    dispatch(ACT_PRODUCT.GetAttributeByCategoryStart(IDCategory))
    navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { IDCategory: IDCategory, NameCategory: NameCategory })
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
    getSuperSaleItem();
  }, []);

  return (
    <>
      <Header />
      <ScrollView>
        <Slider item={image_banner} />
        <View style={tw`px-1`}>
          <View style={tw`flex flex-row justify-between items-center px-1 my-2`}>
            <Text style={tw`text-black text-2xl font-semibold`}>
              Super sale items (30%)
            </Text>
            <TouchableOpacity
              onPress={getSuperSaleItem}
              style={tw`px-2 py-0.5 bg-[#17a2b8ad] rounded-lg`}
            >
              <Text style={tw`text-base text-[${COLOR.WHITE}]`}>View all</Text>
            </TouchableOpacity>
          </View>
          {superSaleItems.length ? (
            <Carousel_product item={superSaleItems} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        {/* <View style={tw`bg-white pt-5`}>
        <Text style={tw`text-black text-2xl font-semibold pl-2 text-center`}>
          Categories
        </Text>
      </View> */}
        {
          allCategory.length ? (
            <View style={tw`w-full flex-row flex-wrap mt-2 p-3 bg-white`}>
              {allCategory.map((category, index) => {
                return (
                  <View style={tw`w-1/3 p-2`}>
                    <TouchableOpacity
                      onPress={() => handleGetProductByCategory(category.category_id, category.category_name)}
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
          ) : (
            <SkeletonCategories />
          )
        }
        <Image
          source={{ uri: 'https://res.cloudinary.com/dwd5gmp97/image/upload/v1678780917/emwqpmbve5rhw7revnt2.jpg' }}
          style={tw`w-full h-35`}
          resizeMode='stretch'
        />
        <View style={tw`px-1`}>
          <Text style={tw`text-black text-2xl font-semibold px-1 my-2`}>
            Best selling items
          </Text>
          {topProduct.length ? (
            <Carousel_product item={topProduct} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        <View style={tw`px-1`}>
          <View style={tw`flex flex-row justify-between items-center px-1 my-2`}>
            <Text style={tw`text-black text-2xl font-semibold`}>
              Sale items (20%)
            </Text>
          </View>
          {promotional.length ? (
            <Carousel_product item={promotional} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dwd5gmp97/image/upload/v1678780935/t1mjo4hndhi3pixpt7da.jpg' }}
          style={tw`w-full h-35 mt-2`}
          resizeMode='stretch'
        />
        <View style={tw`px-1`}>
          <Text style={tw`text-black text-2xl font-semibold px-1 my-2`}>
            Best selling item of the month
          </Text>
          {topProduct.length ? (
            <Carousel_product item={topProduct} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        <View style={tw`px-1`}>
          <View style={tw`flex flex-row justify-between items-center px-1 my-2`}>
            <Text style={tw`text-black text-2xl font-semibold`}>
              Popular products
            </Text>
          </View>
          {promotional.length ? (
            <Carousel_product item={promotional} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dwd5gmp97/image/upload/v1681178090/euiilbjeej8t9x0jv0xy.jpg' }}
          style={tw`w-full h-35 mt-2`}
          resizeMode='stretch'
        />
        <View style={tw`px-1`}>
          <Text style={tw`text-black text-2xl font-semibold px-1 my-2`}>
            Best selling item of the week
          </Text>
          {topProduct.length ? (
            <Carousel_product item={topProduct} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        <View style={tw`px-1`}>
          <View style={tw`flex flex-row justify-between items-center px-1 my-2`}>
            <Text style={tw`text-black text-2xl font-semibold`}>
              Sale items (15%)
            </Text>
          </View>
          {promotional.length ? (
            <Carousel_product item={promotional} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dwd5gmp97/image/upload/v1681178027/rqophighwfia49da8iki.jpg' }}
          style={tw`w-full h-35 mt-2`}
          resizeMode='stretch'
        />
      </ScrollView>
    </>
  );
}
