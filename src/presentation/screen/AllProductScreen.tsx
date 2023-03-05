import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { FlatGrid } from 'react-native-super-grid';
import Product_Item from '../components/Product_Item'
import CategoriesModal from '../modal/CategoriesModal'
import { COLOR } from '../constants';
import Header from '../components/Header';

export default function AllProductScreen() {
    const data = [
        {
            product_id: '1',
            product_name: 'Balo Laptop 14 inch Tucano LUX BKML13',
            trademark: '',
            product_slug: '',
            product_description: '',
            product_price: '0.8',
            product_discount: '0.3',
            product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            image_description1: '',
            image_description2: ''
        },
        {
            product_id: '2',
            product_name: 'Balo Laptop 14 inch Tucano LUX BKML13',
            trademark: '',
            product_slug: '',
            product_description: '',
            product_price: '0.8',
            product_discount: '0.3',
            product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            image_description1: '',
            image_description2: ''
        },
        {
            product_id: '3',
            product_name: 'Balo Laptop 14 inch Tucano LUX BKML13',
            trademark: '',
            product_slug: '',
            product_description: '',
            product_price: '0.8',
            product_discount: '0.3',
            product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            image_description1: '',
            image_description2: ''
        },
        {
            product_id: '4',
            product_name: 'Balo Laptop 14 inch Tucano LUX BKML13',
            trademark: '',
            product_slug: '',
            product_description: '',
            product_price: '0.8',
            product_discount: '0.3',
            product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            image_description1: '',
            image_description2: ''
        },
        {
            product_id: '5',
            product_name: 'Balo Laptop 14 inch Tucano LUX BKML13',
            trademark: '',
            product_slug: '',
            product_description: '',
            product_price: '0.8',
            product_discount: '0.3',
            product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            image_description1: '',
            image_description2: ''
        },
    ]
    const [visible, setVisibility] = useState(false)
    const handleVisible = () => {
        setVisibility(!visible)
    }

    return (
        <View style={tw`flex w-full h-full bg-white`}>
            <Header />
            <View style={tw`px-3`}>
                <TouchableOpacity
                    onPress={handleVisible}
                    style={tw`p-2.5 w-24 border border-gray-300 rounded-lg my-5`}
                >
                    <Text style={tw`text-xl text-[${COLOR.PRIMARY}] text-center font-medium`}>Filter</Text>
                </TouchableOpacity>
                {
                    data.length
                        ? (
                            <FlatList
                                data={data}
                                numColumns={3}
                                renderItem={(item) => <Product_Item item={item} />}
                                keyExtractor={item => item.product_id}
                                showsHorizontalScrollIndicator={false}
                                ListFooterComponent={
                                    <View style={tw`flex flex-row items-center justify-center my-3`}>
                                        <TouchableOpacity
                                            style={tw`px-3 py-2 bg-[${COLOR.PRIMARY}] rounded-md mx-1.5`}
                                        >
                                            <Text style={tw`text-base text-[${COLOR.WHITE}] font-medium`}>1</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={tw`px-3 py-2 bg-[${COLOR.PRIMARY}] rounded-md mx-1.5`}
                                        >
                                            <Text style={tw`text-base text-[${COLOR.WHITE}] font-medium`}>2</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={tw`px-3 py-2 bg-[${COLOR.PRIMARY}] rounded-md mx-1.5`}
                                        >
                                            <Text style={tw`text-base text-[${COLOR.WHITE}] font-medium`}>3</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                            // <FlatGrid
                            //     data={data}
                            //     itemDimension={120}
                            //     renderItem={(item) =>
                            //         <Product_Item
                            //             item={item}
                            //         />
                            //     }
                            //     style={tw`pt-2 bg-white`}
                            //     keyExtractor={item => item._id}
                            //     spacing={5}
                            //     showsHorizontalScrollIndicator={false}
                            //     showsVerticalScrollIndicator={false}
                            // />
                        )
                        : (
                            <View style={tw`flex justify-center h-full`}>
                                <Text style={tw`text-base font-medium text-center`}>No products</Text>
                            </View>
                        )
                }
            </View>
            <CategoriesModal
                visible={visible}
                handleVisible={handleVisible}
            />
        </View>
    )
}