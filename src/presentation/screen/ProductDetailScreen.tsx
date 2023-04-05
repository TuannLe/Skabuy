import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc'
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import ButtonGroup from '../components/ButtonGroup';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import RenderHTML from "react-native-render-html";
import { useDispatch, useSelector } from "react-redux";
import * as ACT_CART from '../../core/redux/actions/cart'
import AXIOS from '../../core/api';
import { COLOR, ROUTER } from '../constants';
import { formatNumber, discountPrice } from '../../util/helper';
import Carousel_product from '../components/Carousel_product';
import Header from '../components/Header'
import ToolBar from '../components/ToolBar'
import Slider from '../components/Slider';
import { getPromotionalProducts } from '../../core/api/ProductApi';
import ItemReviews from '../components/ItemReviews';

const WIDTH = Dimensions.get('window').width;

const image_icon = [
    'https://skabuy.com/icons/facebook.png',
    'https://skabuy.com/icons/messenger.png',
    'https://skabuy.com/icons/pinterest.png',
    'https://skabuy.com/icons/twitter.png'
]

export default function ProductDetailScreen({ route, navigation }: any) {
    const dispatch = useDispatch()
    const { slug, otherParam } = route.params;
    const [Product, setProduct] = useState([]);
    const [Options, setOptions] = useState([]);
    const [Comment, setComment] = useState([]);
    const [Description, setDescription] = useState("");
    const [Readmore, setReadmore] = useState(false);
    const [RelatedProduct, setRelatedProduct] = useState([]);
    const [formatDolla, setFormatDolla] = useState("");
    const [selectedCharacteristics, setSelectedCharacteristics] = useState();
    const [quantity, onChangeQuantity] = useState(0);
    const [warn, setWarn] = useState('')
    const [value, onChangeText] = React.useState('');
    
    const infoUser = useSelector((state: any) => state.auth.infoUser)

    const image_product = [
        Product.product_image,
        Product.image_description1,
        Product.image_description2
    ]

    function onSelectCharacteristics(characteristics: any) {
        setSelectedCharacteristics(characteristics);
        onChangeQuantity(0);
    }

    const getProductBySlug = async () => {
        try {
            const res = await AXIOS.get(`product/get-product-by-slug/` + slug);
            setProduct(res.data.data)
            setFormatDolla((res.data.data.product_price))
            setDescription(res.data.data.product_description.slice(3,200) + "...")

            const res1 = await AXIOS.get(`attribute/id/` + res.data.data.product_id);
            setOptions(res1.data.data);

            const res2 = await AXIOS.get(`product/related/` + res.data.data.category_id);
            setRelatedProduct(res2.data.data)

            const res_comment = await AXIOS.get(`comment/product/` + res.data.data.product_id);
            setComment(res_comment.data.data);
        } catch (error) {
            return error;
        }
    }

    const handlePlus = () => {
        if (selectedCharacteristics != null) {
            if (quantity < selectedCharacteristics.total) {
                onChangeQuantity(quantity + 1)
            }
        }
    }

    const handleMinus = () => {
        if (quantity > 0) {
            onChangeQuantity(quantity - 1)
        }
    }

    useEffect(() => {
        getProductBySlug();
    }, []);

    const token = useSelector((state: any) => state.auth.token)

    const addItemToCart = () => {
        if (token != '') {
            if (selectedCharacteristics === undefined) {
                setWarn("Please select enough product characteristics");
            } else {
                setWarn("")
                const product_current = {
                    product_id: Product.product_id,
                    product_image: Product.product_image,
                    product_name: Product.product_name,
                    price: Product.product_discount
                        ? discountPrice(
                            Product.product_price,
                            Product.product_discount
                        )
                        : Product.product_price,
                    quantity: quantity,
                    characteristics: selectedCharacteristics,
                    totalprice: Product.product_discount
                        ? discountPrice(
                            Product.product_price,
                            Product.product_discount
                        ) * quantity
                        : Product.product_price * quantity,
                };
                dispatch(ACT_CART.AddItemCart(product_current));
            }
        } else {
            navigation.navigate(ROUTER.LOGIN)
            setWarn("You need to be logged in to perform this action");
        }
    }

    return (
        <ScrollView style={tw`w-full h-full`}>
            <View style={tw`flex-1`}>
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
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={tw`w-12 h-12 rounded-full bg-black opacity-30 absolute top-2 left-2`}
            >
            </TouchableOpacity>
            <FontAwesome
                name="angle-left"
                size={36}
                style={tw`text-white absolute top-3 left-5.5`}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate(ROUTER.CART_TAB)}
                style={tw`w-12 h-12 rounded-full bg-black opacity-30 absolute top-2 right-2`}
            >
            </TouchableOpacity>
            <Feather
                name='shopping-cart'
                style={tw`text-2xl text-white absolute top-4 right-5.5`}
            />
            <View style={tw`p-2 bg-white`}>
                {
                    Product.product_discount > 0
                        ?
                        <>
                            <View style={tw`bg-red-700 w-30 rounded`}>
                                <Text style={tw`font-bold text-white text-center p-0.5`}>Instant Savings</Text>
                            </View>
                            <Text style={tw`text-[#dc3545] mt-1 text-xl font-medium`}>{formatNumber((Product.product_discount / 100) * formatDolla)} off with Instant Savings</Text>
                        </>
                        :
                        <></>
                }
                <Text style={tw`text-2xl text-black font-medium`}>{Product.product_name}</Text>
                <View style={tw`flex flex-row items-center`}>
                    <View style={tw`flex flex-row items-center`}>
                        <Ionicons name='star-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-half-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-outline' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                    </View>
                    <Text style={tw`text-lg font-medium ml-3 text-[${COLOR.GRAY}]`}>(0)</Text>
                </View>
                <View style={tw`my-3 flex`}>
                    {
                        Product.product_discount > 0
                            ?
                            <View style={tw`flex flex-row`}>
                                <Text style={tw`text-5xl text-[${COLOR.BLACK}] font-bold`}>{formatNumber(formatDolla - ((Product.product_discount / 100) * formatDolla))}</Text>
                                <Text style={tw`text-3xl text-[${COLOR.GRAY}] line-through ml-2 font-medium mt-1`}>{formatNumber(formatDolla)}</Text>
                            </View>
                            :
                            <Text style={tw`text-3xl text-[${COLOR.BLACK}] font-bold`}>{formatNumber(formatDolla)}</Text>
                    }
                </View>
                <View>
                    <Text style={tw`text-xl text-black font-bold`}>Options:</Text>

                    <View style={tw`w-full`}>
                        <View style={tw`w-full flex-row flex-wrap`}>
                            {Options.map((option, index) => {
                                return (
                                    <View key={index} style={tw`w-1/2 py-1 pr-2`}>
                                        <TouchableOpacity
                                            onPress={() => onSelectCharacteristics(option)}
                                            style={tw`flex-1 border border-gray-300 items-center rounded-md p-2 ${(selectedCharacteristics != undefined &&
                                                selectedCharacteristics.values === option.values) ? `border-[${COLOR.PRIMARY}]` : ""}`}
                                        >
                                            <Text style={tw`font-semibold`}>{option.values}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                        <View>
                            <Text style={tw`text-base`}>
                                {selectedCharacteristics != undefined &&
                                    `${selectedCharacteristics.total} ${selectedCharacteristics.total > 1 ? "products are" : "product is"
                                    } available`}
                            </Text>
                        </View>
                        <View style={tw`box-border flex-row h-10 mt-3`}>
                            <TouchableOpacity
                                onPress={() => handleMinus()}
                                style={tw`bg-[#17a2b8] rounded items-center w-10 justify-center`}
                            >
                                <Ionicons name='remove-outline' style={tw`text-xl font-black text-[${COLOR.WHITE}]`} />
                            </TouchableOpacity>
                            <View style={tw`bg-[#F5F5F5] w-12 justify-center`}>
                                <Text style={tw`text-xl text-black text-center`}>{quantity}</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => handlePlus()}
                                style={tw`bg-[#17a2b8] rounded items-center w-10 justify-center`}
                            >
                                <Ionicons name='add-outline' style={tw`text-xl font-black text-[${COLOR.WHITE}]`} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => addItemToCart()}
                                style={tw`bg-[#17a2b8] rounded items-center w-32 justify-center ml-5 flex-row`}
                            >
                                <Feather
                                    name='shopping-cart'
                                    style={tw`text-lg font-black text-[${COLOR.WHITE}]`}
                                />
                                {/* <Ionicons name='cart-outline' style={tw`text-xl font-black text-[${COLOR.WHITE}]`} /> */}
                                <Text style={tw`text-white font-medium text-base`}> Add To Cart</Text>
                            </TouchableOpacity>
                        </View>
                        {warn ? (
                            <Text style={tw`text-red-600 text-base mt-2`}>*{warn}</Text>
                        ) : (
                            <Text></Text>
                        )}

                        {/* <View style={tw`flex-row box-border mt-5`}>
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
                    </View> */}
                        {/* 
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
                    </View> */}
                    </View>
                </View>
            </View>
            <View style={tw`mt-5 bg-white p-5`}>
                <Text style={tw`text-3xl text-black font-medium`}>Related Products</Text>
                <Carousel_product item={RelatedProduct} />
            </View>
            <View style={tw`mt-5 bg-white p-5`}>
                <Text style={tw`text-3xl text-black font-medium`}>Description</Text>
                <Text style={tw`border-b border-indigo-500`}></Text>
                {Readmore === false ? (
                    <View>
                        <RenderHTML source={{ html: Description }} />
                        <TouchableOpacity
                            onPress={() => setReadmore(true)}
                        >
                            <Text style={tw`text-[#0067a0] font-bold text-center text-base`}>Read more</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <RenderHTML source={{ html: Product.product_description }} />
                        <TouchableOpacity
                            onPress={() => setReadmore(false)}
                        >
                            <Text style={tw`text-[#0067a0] font-bold text-center text-base`}>Read less</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View style={tw`mt-5 bg-white p-5`}>
                <Text style={tw`text-3xl text-black font-medium`}>Reviews (500)</Text>
                <FlatList
                    data={Comment}
                    renderItem={({item, index, separators}) => <ItemReviews item={Comment[index]}/>}
                />
            </View>
            {infoUser ?(
                <View style={tw`mt-5 bg-white p-5`}>
                    <Text style={tw`text-3xl text-black font-medium`}>Leave a review</Text>
                    <Text style={tw`text-lg p-1`}>Your Name: <Text style={tw`text-xl text-black font-medium`}>{infoUser.user_fullname}</Text></Text>
                    <View style={tw`flex flex-row items-center p-1`}>
                        <Text style={tw`text-lg`}>Your Rating *: </Text>
                        <Ionicons name='star-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-half-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                        <Ionicons name='star-outline' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                    </View>
                    <View style={tw`p-1`}>
                        <Text style={tw`text-lg mb-1`}>Your Reviews *: </Text>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={4}
                            maxLength={40}
                            onChangeText={text => onChangeText(text)}
                            value={value}
                            style={tw`border border-blue-300`}
                        />
                    </View>
                </View>
            ) : (<></>)}

        </ScrollView>
    );
}

