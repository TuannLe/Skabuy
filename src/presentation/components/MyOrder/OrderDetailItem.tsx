import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { COLOR } from '../../constants'
import { formatNumber } from '../../../util/helper'

export default function OrderDetailItem({ item }: any) {
    console.log('it', item)
    return (
        <View style={tw`w-full flex flex-row border-b border-slate-100 py-1`}>
            <Image
                source={{ uri: item.product_image }}
                style={tw`w-15 h-15`}
                resizeMode={'contain'}
            />
            <View style={tw`flex-1 pl-3`}>
                <Text
                    style={tw`text-lg text-black font-400`}
                    numberOfLines={1}
                >
                    {item.product_name}
                </Text>
                <View style={tw`flex flex-row items-center justify-between`}>
                    <Text numberOfLines={1} style={tw`text-base`}>{item.description}</Text>
                    <Text style={tw`text-black`}>{formatNumber(item.product_price - ((item.product_discount / 100) * item.product_price))}</Text>
                </View>
                <View>
                    <Text>x{item.quantity}</Text>
                </View>
            </View>
        </View>
    )
}