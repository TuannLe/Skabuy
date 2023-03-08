import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../constants'

export default function Product_Item({ item } : any) {

    useEffect(() => {
        
    }, []);
    
    return (
        <>
            <TouchableOpacity style={tw`flex-1 p-4 border border-gray-100 bg-white ml-2`}>
                <Image
                    source={{ uri: "https://skabuy.com/" + item.product_image }}
                    style={tw`w-full h-30`}
                    resizeMode={'contain'}
                />
                <Text
                    numberOfLines={1}
                    style={tw`text-lg text-[${COLOR.BLACK}] font-medium`}
                >
                    {item.productName}
                </Text>
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
                <Text style={tw`text-base text-[${COLOR.RED}] font-medium`}>Save $0.20</Text>
                <View style={tw`flex flex-row items-center`}>
                    <Text style={tw`text-xl text-[${COLOR.BLACK}] font-bold`}>${item.product_price}</Text>
                    <Text style={tw`text-sm text-[${COLOR.GRAY}] line-through -mt-2 ml-2`}>0.20</Text>
                </View>
            </TouchableOpacity>
            {item.product_discount > 0 
                ? <Text style={tw`bg-[#b00000] bottom-5 flex text-white flex-col text-sm absolute right-0 pl-1`}>-{item.product_discount}%</Text>
                : <></>
            }
        </>
    )
}