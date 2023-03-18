import { View, Text, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
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
import ButtonGroup from '../components/ButtonGroup';
import { COLOR } from '../constants';
import { formatNumber } from '../../util/helper';
import Icon from 'react-native-vector-icons/Ionicons';
import RenderHTML from "react-native-render-html";

const WIDTH = Dimensions.get('window').width;

const image_icon = [
    'https://skabuy.com/icons/facebook.png',
    'https://skabuy.com/icons/messenger.png',
    'https://skabuy.com/icons/pinterest.png',
    'https://skabuy.com/icons/twitter.png'
]

export default function ProductDetailScreen({ route }) {

    const [Product, setProduct] = useState([]);
    const [Options, setOptions] = useState([]);
    const [RelatedProduct, setRelatedProduct] = useState([]);
    const { slug, otherParam } = route.params;
    const [formatDolla, setFormatDolla] = useState("");

    const [quantity, onChangeQuantity] = React.useState(0);

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

            const res2 = await AXIOS.get(`product/related/` + res.data.data.category_id);
            setRelatedProduct(res2.data.data)
        } catch (error) {
            return error;
        }
    }

    const handlePlus = () => {
        onChangeQuantity(quantity + 1)
    }

    const handleMinus = () => {
        if (quantity > 0) {
            onChangeQuantity(quantity - 1)
        }
    }

    useEffect(() => {
        getProductBySlug();
    }, []);

    const changeColorBorder = () => {
        console.log('hello')
    }

    return (
        <ScrollView style={tw`w-full h-full`}>
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
                                style={{ width: WIDTH, height: 300 }}
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
                            <Text style={tw`text-[#dc3545] font-medium`}>{formatNumber((Product.product_discount / 100) * formatDolla)} off with Instant Savings</Text>
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
                                <Text style={tw`text-xl text-[${COLOR.BLACK}] font-bold`}>{formatNumber(formatDolla - ((Product.product_discount / 100) * formatDolla))}</Text>
                                <Text style={tw`text-sm text-[${COLOR.GRAY}] line-through ml-2 font-bold mt-1`}>{formatNumber(formatDolla)}</Text>
                            </View>
                            :
                            <Text style={tw`text-xl text-[${COLOR.BLACK}] font-bold`}>{formatNumber(formatDolla)}</Text>
                    }
                </View>
                <View>
                    <Text style={tw`font-bold`}>Options:</Text>

                    <View style={tw`w-full`}>
                        {/* {Options.map((option, index) => {
                            return (
                                <View style={tw`w-1/2 p-1`}>
                                    <TouchableOpacity
                                        onPress={() => setColor('green-500')}
                                        style={tw`flex-1 border items-center rounded-md border-red-300 p-1 bg-${color}`}
                                    >

                    <View style={tw`w-full flex-row flex-wrap`}>
                        {Options.map((option, index) => {
                            return (
                                <View style={tw`w-1/2 p-1`}>
                                    <View style={tw`flex-1 border items-center rounded-md border-slate-300 p-1`}>
                                        <Text style={tw`font-semibold`}>{option.values}</Text>
                                    </TouchableOpacity>
                                    <ButtonGroup
                                        buttons={option.values}
                                        doSomethingsAfterClick={changeColorBorder}
                                    />
                                </View>
                            );
                        })} */}
                        <ButtonGroup
                            buttons={Options}
                            doSomethingsAfterClick={changeColorBorder}
                        />
                    </View>

                    <View style={tw`box-border flex-row h-10 mt-5`}>
                        <TouchableOpacity onPress={() => handleMinus()} style={tw`bg-[#17a2b8] rounded items-center w-10 justify-center`}>
                            <Ionicons name='remove-outline' style={tw`text-xl font-black text-[${COLOR.WHITE}]`} />
                        </TouchableOpacity>
                        <View style={tw`bg-[#F5F5F5] w-12 justify-center`}>
                            <Text style={tw`text-center`}>{quantity}</Text>
                        </View>

                        <TouchableOpacity onPress={() => handlePlus()} style={tw`bg-[#17a2b8] rounded items-center w-10 justify-center`}>
                            <Ionicons name='add-outline' style={tw`text-xl font-black text-[${COLOR.WHITE}]`} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleMinus()} style={tw`bg-[#17a2b8] rounded items-center w-32 justify-center ml-5 flex-row`}>
                            <Ionicons name='cart-outline' style={tw`text-xl font-black text-[${COLOR.WHITE}]`} />
                            <Text style={tw`text-white font-medium text-base`}> Add To Cart</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`flex-row box-border mt-5`}>
                        <Text style={tw`font-medium`}>Share on: </Text>
                        {image_icon.map((cate, index) => {
                            return (
                                <View style={tw`ml-1`}>
                                    <Image
                                        source={{ uri: image_icon[index] }}
                                        style={tw`w-5 h-5`}
                                    />
                                </View>
                            );
                        })}
                    </View>

                    <View style={tw`w-full flex-row flex-wrap mt-2 mb-2`}>
                        <View style={tw`w-1/2 p-1`}>
                            <Image
                                source={{ uri: "https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" }}
                                style={tw`w-full h-15 flex-1 p-1`}
                            />
                        </View>
                        <View style={tw`w-1/2 p-1 justify-center`}>
                            <Image
                                source={{ uri: "https://static.tildacdn.com/tild6333-3965-4332-b730-663930356132/secure-stripe-paymen.png" }}
                                style={tw`w-full h-6 p-1`}
                            />
                        </View>
                    </View>
                </View>
            </View>

            <View style={tw`m-2 rounded`}>
                <Text style={tw`text-xl text-black font-medium p-2`}>Related Products</Text>
                <Carousel_product item={RelatedProduct} />
            </View>
            <View style={tw`bg-white mt-5 m-2 rounded p-4`}>
                <Text style={tw`text-xl text-black font-medium p-2`}>Description</Text>
                <Text style={tw`border-b border-indigo-500`}></Text>
                <RenderHTML source={{ html: Product.product_description }} />
            </View>
        </ScrollView>
    );
}

