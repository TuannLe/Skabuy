import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { FlatGrid } from 'react-native-super-grid';
import Product_Item from '../components/Product_Item'
import { COLOR } from '../constants';

export default function AllProductScreen({ item, index }: any) {
    const data = [
        {
            _id: '1',
            imageUrl: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            productName: 'Balo Laptop 14 inch Tucano LUX BKML13',
            productPrice: '0.80',
            productStar: '4',
            feedback: '200'
        },
        {
            _id: '2',
            imageUrl: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            productName: 'Balo Laptop 14 inch Tucano LUX BKML13',
            productPrice: '0.80',
            productStar: '4',
            feedback: '200'
        },
        {
            _id: '3',
            imageUrl: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            productName: 'Balo Laptop 14 inch Tucano LUX BKML13',
            productPrice: '0.80',
            productStar: '4',
            feedback: '200'
        },
        {
            _id: '4',
            imageUrl: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            productName: 'Balo Laptop 14 inch Tucano LUX BKML13',
            productPrice: '0.80',
            productStar: '4',
            feedback: '200'
        },
        {
            _id: '6',
            imageUrl: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            productName: 'Balo Laptop 14 inch Tucano LUX BKML13',
            productPrice: '0.80',
            productStar: '4',
            feedback: '200'
        },
        {
            _id: '9',
            imageUrl: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            productName: 'Balo Laptop 14 inch Tucano LUX BKML13',
            productPrice: '0.80',
            productStar: '4',
            feedback: '200'
        },
        {
            _id: '14',
            imageUrl: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            productName: 'Balo Laptop 14 inch Tucano LUX BKML13',
            productPrice: '0.80',
            productStar: '4',
            feedback: '200'
        },
        {
            _id: '16',
            imageUrl: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            productName: 'Balo Laptop 14 inch Tucano LUX BKML13',
            productPrice: '0.80',
            productStar: '4',
            feedback: '200'
        },
        {
            _id: '19',
            imageUrl: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
            productName: 'Balo Laptop 14 inch Tucano LUX BKML13',
            productPrice: '0.80',
            productStar: '4',
            feedback: '200'
        },
    ]
    return (
        <View style={tw`w-full h-full bg-white`}>
            <Text style={tw`text-2xl text-[${COLOR.BLACK}] font-medium`}>AllProduct</Text>
            {
                data.length
                    ? (
                        <FlatGrid
                            data={data}
                            itemDimension={120}
                            renderItem={(item) =>
                                <Product_Item
                                    item={item}
                                />
                            }
                            style={tw`pt-2 bg-white`}
                            keyExtractor={item => item._id}
                            spacing={5}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    )
                    : (
                        <View style={tw`flex justify-center h-full`}>
                            <Text style={tw`text-base font-medium text-center`}>Share your first post</Text>
                            <Text style={tw`text-gray-400 text-center`}>Upload a image with captions, sounds and more. Your posts will appear on your profile</Text>
                        </View>
                    )
            }
            <View style={tw`flex flex-row items-center justify-center mb-3`}>
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
        </View>
    )
}