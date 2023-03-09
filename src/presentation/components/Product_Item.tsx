import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../constants'

export default function Product_Item({ item }: any) {
    return (
        <TouchableOpacity style={tw`flex-1 h-60 p-2 border border-gray-100`}>
            <Image
                source={{ uri: item.product_image }}
                style={tw`w-full h-30`}
                resizeMode={'contain'}
            />
            <Text
                numberOfLines={1}
                style={tw`text-lg text-[${COLOR.BLACK}] font-medium`}
            >
                {item.product_name}
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
            <Text style={tw`text-base text-[${COLOR.RED}] font-medium`}>Save ${item.product_discount}</Text>
            <View style={tw`flex flex-row items-center`}>
                <Text style={tw`text-2xl text-[${COLOR.BLACK}] font-bold`}>$0.80</Text>
                <Text style={tw`text-sm text-[${COLOR.GRAY}] line-through -mt-2 ml-2`}>0.20</Text>
            </View>
        </TouchableOpacity>
    )
}