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

const WIDTH = Dimensions.get('window').width;
  
export default function ProductDetailScreen({ route }) {

    const [Product, setProduct] = useState([]);
    const { slug, otherParam } = route.params;
    const [formatDolla, setFormatDolla] = useState("");
    
    const image_product = [
        "https://skabuy.com" + Product.product_image,
        "https://skabuy.com" + Product.image_description1,
        "https://skabuy.com" + Product.image_description2
    ]

    const formatNumber = (q : any) => {
        return q.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    } 

    const getProductBySlug = async () => {
        try {
            const res = await AXIOS.get(`product/get-product-by-slug/` + slug);
            setProduct(res.data.data)
            setFormatDolla(formatNumber(res.data.data.product_price))
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        getProductBySlug();
    }, []);

    return (
        <ScrollView>     
            <Header />
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
                    <Text style={tw`text-xl text-[${COLOR.BLACK}] font-bold`}>{formatDolla}</Text>
                    <Text style={tw`text-sm text-[${COLOR.GRAY}] -mt-2 ml-2`}>0.20</Text>
                </View>
            </View>
        </ScrollView>
    );
}
