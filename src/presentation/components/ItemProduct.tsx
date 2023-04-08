import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { ROUTER, COLOR } from '../constants'
import { formatNumber } from '../../util/helper';

export default function ItemProduct({ item }: any) {
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    return (
        <TouchableOpacity
            style={tw`w-[${(width - 30) / 3}px] p-2 border mx-1 mt-2 border-gray-100 bg-white`}
            onPress={() => navigation.navigate(ROUTER.PRODUCT_DETAILS, { slug: item.product_slug })}
        >
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
            {
                item.product_discount > 0
                    ? <Text style={tw`bg-[#b00000] flex text-white flex-col text-sm absolute right-1 top-1 rounded-sm`}>-{item.product_discount}%</Text>
                    : <></>
            }
            <View style={tw`flex`}>
                {
                    item.product_discount > 0
                        ?
                        <>
                            <Text style={tw`text-xl text-[${COLOR.BLACK}] font-bold`}>{formatNumber(item.product_price - ((item.product_discount / 100) * item.product_price))}</Text>
                            <Text style={tw`text-lg text-red-600 line-through`}>{formatNumber(item.product_price)}</Text>
                        </>
                        :
                        <Text style={tw`text-xl text-[${COLOR.BLACK}] font-bold`}>{formatNumber(item.product_price)}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}