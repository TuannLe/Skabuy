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
import {
  getSuperSaleItems,
  getProductAll,
  getBestSellingItems,
  getPopularItems,
  getPopularAll
} from '../../core/api/ProductApi'
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

  const [allCategory, setAllCategory] = useState([]);
  const [superSaleItems, setSuperSaleItems] = useState([])
  const [saleItems20, setSaleItems20] = useState([])
  const [saleItems15, setSaleItems15] = useState([])
  const [arrPopular, setArrPopular] = useState([])
  const [arrBestSelling, setArrBestSelling] = useState([])
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [monthStart, setmonthStart] = useState('')
  const [monthEnd, setmonthEnd] = useState('')

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    setDateStart(year + '-' + month + '-' + (date - 7))
    setDateEnd(year + '-' + month + '-' + date)
    setmonthStart(year + '-' + (month - 1) + '-' + date)
    setmonthEnd(year + '-' + month + '-' + date)
  }

  const getAllCategory = async () => {
    try {
      const res = await AXIOS.get(`category/all`);
      setAllCategory(res.data.data)
    } catch (error) {
      return error;
    }
  }

  const getDataProduct = async () => {
    const data = {
      price: []
    }
    const encode = btoa(JSON.stringify(data))
    const response1 = await getSuperSaleItems({ encode: encode, percent: 30 })
    if (response1.status === 'success') {
      setSuperSaleItems(response1.data)
    }
    const response2 = await getSuperSaleItems({ encode: encode, percent: 20 })
    if (response2.status === 'success') {
      setSaleItems20(response2.data)
    }
    const response3 = await getSuperSaleItems({ encode: encode, percent: 15 })
    if (response3.status === 'success') {
      setSaleItems15(response3.data)
    }
    const response4 = await getPopularItems(encode)
    if (response4.status === 'success') {
      setArrPopular(response4.data)
    }
  }
  const handleGetBestSellingProduct = async () => {
    const postData = {
      data: {
        start: "2023-1-1",
        end: "2030-1-1",
        full: 0,
        price: []
      }
    }
    const response = await getBestSellingItems(postData)
    if (response.status === 'success') {
      setArrBestSelling(response.data)
    }
  }

  const handleGetProductAll = async (slug: any) => {
    const data = {
      price: []
    }
    var response
    const encode = btoa(JSON.stringify(data))

    const postData = {
      data: {
        start: "2023-1-1",
        end: "2030-1-1",
        full: 1,
        price: []
      }
    }
    const postDataWeek = {
      data: {
        start: dateStart,
        end: dateEnd,
        full: 1,
        price: []
      }
    }
    const postDataMonth = {
      data: {
        start: monthStart,
        end: monthEnd,
        full: 1,
        price: []
      }
    }
    switch (slug) {
      case 30:
        response = await getProductAll({ encode: encode, percent: slug })
        if (response.status === 'success') {
          let maxProduct = response.data.reduce((max: any, el: any) =>
            max.product_price > el.product_price ? max : el
          );
          navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { ArrayProduct: response.data, maxPrice: maxProduct.product_price, percent: slug })
        }
        break;
      case 20:
        response = await getProductAll({ encode: encode, percent: slug })
        if (response.status === 'success') {
          let maxProduct = response.data.reduce((max: any, el: any) =>
            max.product_price > el.product_price ? max : el
          );
          navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { ArrayProduct: response.data, maxPrice: maxProduct.product_price, percent: slug })
        }
        break;
      case 15:
        response = await getProductAll({ encode: encode, percent: slug })
        if (response.status === 'success') {
          let maxProduct = response.data.reduce((max: any, el: any) =>
            max.product_price > el.product_price ? max : el
          );
          navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { ArrayProduct: response.data, maxPrice: maxProduct.product_price, percent: slug })
        }
        break;
      case 'popular':
        response = await getPopularAll(encode)
        if (response.status === 'success') {
          let maxProduct = response.data.reduce((max: any, el: any) =>
            max.product_price > el.product_price ? max : el
          );
          navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { ArrayProduct: response.data, maxPrice: maxProduct.product_price, percent: slug })
        }
        break;
      case 'best_selling':
        response = await getBestSellingItems(postData)
        if (response.status === 'success') {
          let maxProduct = response.data.reduce((max: any, el: any) =>
            max.product_price > el.product_price ? max : el
          );
          navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { ArrayProduct: response.data, maxPrice: maxProduct.product_price, percent: slug })
        }
      case 'best_selling_week':
        response = await getBestSellingItems(postDataWeek)
        if (response.status === 'success' && response.data.length) {
          let maxProduct = response.data.reduce((max: any, el: any) =>
            max.product_price > el.product_price ? max : el
          );
          navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { ArrayProduct: response.data, maxPrice: maxProduct.product_price, percent: slug })
        } else {
          navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { ArrayProduct: response.data, maxPrice: 0, percent: slug })
        }
      case 'best_selling_month':
        response = await getBestSellingItems(postDataMonth)
        if (response.status === 'success' && response.data.length) {
          let maxProduct = response.data.reduce((max: any, el: any) =>
            max.product_price > el.product_price ? max : el
          );
          navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { ArrayProduct: response.data, maxPrice: maxProduct.product_price, percent: slug })
        } else {
          navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { ArrayProduct: response.data, maxPrice: 0, percent: slug })
        }
        break;
    }
  }

  const handleGetProductByCategory = (IDCategory: any, NameCategory: any) => {
    dispatch(ACT_PRODUCT.GetProductByCategoryStart(IDCategory))
    dispatch(ACT_PRODUCT.GetAttributeByCategoryStart(IDCategory))
    navigation.navigate(ROUTER.PRODUCTS_BY_CATEGORY_SCREEN, { IDCategory: IDCategory, NameCategory: NameCategory })
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
    getAllCategory();
    getDataProduct();
    handleGetBestSellingProduct();
    getCurrentDate();
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
              onPress={() => handleGetProductAll(30)}
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
          <View style={tw`flex flex-row items-center justify-between px-1 my-2`}>
            <Text style={tw`text-black text-2xl font-semibold`}>
              Best selling items
            </Text>
            <TouchableOpacity
              onPress={() => handleGetProductAll('best_selling')}
              style={tw`px-2 py-0.5 bg-[#17a2b8ad] rounded-lg`}
            >
              <Text style={tw`text-base text-[${COLOR.WHITE}]`}>View all</Text>
            </TouchableOpacity>
          </View>
          {arrBestSelling.length ? (
            <Carousel_product item={arrBestSelling} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        <View style={tw`px-1`}>
          <View style={tw`flex flex-row justify-between items-center px-1 my-2`}>
            <Text style={tw`text-black text-2xl font-semibold`}>
              Sale items (20%)
            </Text>
            <TouchableOpacity
              onPress={() => handleGetProductAll(20)}
              style={tw`px-2 py-0.5 bg-[#17a2b8ad] rounded-lg`}
            >
              <Text style={tw`text-base text-[${COLOR.WHITE}]`}>View all</Text>
            </TouchableOpacity>
          </View>
          {saleItems20.length ? (
            <Carousel_product item={saleItems20} />
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
          <View style={tw`flex flex-row items-center justify-between px-1 my-2`}>
            <Text style={tw`text-black text-2xl font-semibold`}>
              Best selling item of the month
            </Text>
            <TouchableOpacity
              onPress={() => handleGetProductAll('best_selling_month')}
              style={tw`px-2 py-0.5 bg-[#17a2b8ad] rounded-lg`}
            >
              <Text style={tw`text-base text-[${COLOR.WHITE}]`}>View all</Text>
            </TouchableOpacity>
          </View>
          {arrBestSelling.length ? (
            <Carousel_product item={arrBestSelling} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        <View style={tw`px-1`}>
          <View style={tw`flex flex-row justify-between items-center px-1 my-2`}>
            <Text style={tw`text-black text-2xl font-semibold`}>
              Popular products
            </Text>
            <TouchableOpacity
              onPress={() => handleGetProductAll('popular')}
              style={tw`px-2 py-0.5 bg-[#17a2b8ad] rounded-lg`}
            >
              <Text style={tw`text-base text-[${COLOR.WHITE}]`}>View all</Text>
            </TouchableOpacity>
          </View>
          {arrPopular.length ? (
            <Carousel_product item={arrPopular} />
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
          <View style={tw`flex flex-row items-center justify-between px-1 my-2`}>
            <Text style={tw`text-black text-2xl font-semibold`}>
              Best selling item of the week
            </Text>
            <TouchableOpacity
              onPress={() => handleGetProductAll('best_selling_week')}
              style={tw`px-2 py-0.5 bg-[#17a2b8ad] rounded-lg`}
            >
              <Text style={tw`text-base text-[${COLOR.WHITE}]`}>View all</Text>
            </TouchableOpacity>
          </View>
          {arrBestSelling.length ? (
            <Carousel_product item={arrBestSelling} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        <View style={tw`px-1`}>
          <View style={tw`flex flex-row justify-between items-center px-1 my-2`}>
            <Text style={tw`text-black text-2xl font-semibold`}>
              Sale items (15%)
            </Text>
            <TouchableOpacity
              onPress={() => handleGetProductAll(15)}
              style={tw`px-2 py-0.5 bg-[#17a2b8ad] rounded-lg`}
            >
              <Text style={tw`text-base text-[${COLOR.WHITE}]`}>View all</Text>
            </TouchableOpacity>
          </View>
          {saleItems15.length ? (
            <Carousel_product item={saleItems15} />
          ) : (
            <SkeletonItemProduct />
          )}
        </View>
        {/* <Image
          source={{ uri: 'https://res.cloudinary.com/dwd5gmp97/image/upload/v1681178027/rqophighwfia49da8iki.jpg' }}
          style={tw`w-full h-35 mt-2`}
          resizeMode='stretch'
        /> */}
      </ScrollView>
    </>
  );
}
