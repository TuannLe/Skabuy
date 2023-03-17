import { View, Text, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc'
import Header from '../components/Header'
import ToolBar from '../components/ToolBar'
import Carousel_product from '../components/Carousel_product';
import Slider from '../components/Slider';
import { getPromotionalProducts } from '../../core/api/ProductApi';
import AXIOS from '../../core/api';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../constants';
import { formatNumber } from '../../util/helper';

const WIDTH = Dimensions.get('window').width;
  
export default function ProductDetailScreen({ route }) {

    const [Product, setProduct] = useState([]);
    const [Options, setOptions] = useState([]);
    const { slug, otherParam } = route.params;
    const [formatDolla, setFormatDolla] = useState("");
    
    const image_product = [
        Product.product_image,
        Product.image_description1,
        Product.image_description2
    ]

    const getProductBySlug = async () => {
        try {
            const res = await AXIOS.get(`product/get-product-by-slug/` + slug);
            setProduct(res.data.data)
            setFormatDolla((res.data.data.product_price))

            const res1 = await AXIOS.get(`attribute/id/` + res.data.data.product_id);
            setOptions(res1.data.data);
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        getProductBySlug();
        console.log(Options);
    }, []);

    return (
        <ScrollView>     
            <View style={tw`flex-1 mt-2 mb-2`}>
                <Carousel
                    loop
                    width={WIDTH}
                    height={300}
                    autoPlay={true}
                    data={[...new Array(3).keys()]}
                    scrollAnimationDuration={1500}
                    renderItem={({ index }) => (
                        <View style={tw`flex-1 justify-center`}>
                            <Image
                                style={{ width: WIDTH, height: 300}}
                                source={{ uri: image_product[index] }}
                            />

                        </View>
                    )}
                />
            </View>
            <View style={tw`p-2 bg-white`}>
                {
                    Product.product_discount > 0
                        ?
                            <>
                                <View style={tw`bg-red-700 w-30 rounded`}>
                                    <Text style={tw`font-bold text-white text-center p-0.5`}>Instant Savings</Text>
                                </View>
                                <Text style={tw`text-[#dc3545] font-medium`}>{formatNumber((Product.product_discount/100) * formatDolla)} off with Instant Savings</Text>
                            </>
                        :
                            <></>
                }
                <Text style={tw`text-xl text-black font-medium`}>{Product.product_name}</Text>
                <View style={tw`flex flex-row items-center justify-between`}>
                    <View style={tw`flex flex-row items-center`}>
                        <Ionicons name='star-sharp' style={tw`text-base text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-sharp' style={tw`text-base text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-sharp' style={tw`text-base text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-half-sharp' style={tw`text-base text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-outline' style={tw`text-base text-[${COLOR.PRIMARY}]`} />
                    </View>
                    <Text style={tw`text-base text-[${COLOR.GRAY}]`}>(0)</Text>
                </View>
                <View style={tw`flex`}>
                    {
                        Product.product_discount > 0
                            ? 
                                <View style={tw`flex flex-row`}>
                                    <Text style={tw`text-xl text-[${COLOR.BLACK}] font-bold`}>{formatNumber(formatDolla - ((Product.product_discount/100) * formatDolla))}</Text>
                                    <Text style={tw`text-sm text-[${COLOR.GRAY}] line-through ml-2 font-bold mt-1`}>{formatNumber(formatDolla)}</Text>
                                </View> 
                            : 
                                <Text style={tw`text-xl text-[${COLOR.BLACK}] font-bold`}>{formatNumber(formatDolla)}</Text>
                    }     
                </View>
                <View>
                    <Text style={tw`font-bold`}>Options:</Text>

                    <View style={tw`w-full flex-row flex-wrap active:border-blue-400`}>
                        {Options.map((option, index) => {
                            return (
                                <View style={tw`w-1/2 p-1 active:border-blue-400`}>
                                    <View style={tw`flex-1 border items-center rounded-md border-slate-300 p-1 active:border-blue-400`}>
                                        <Text style={tw`font-semibold`}>{option.values}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
