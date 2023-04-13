import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import {
    formatNumber
} from "../../../util/helper";
import { ROUTER } from '../../constants';

export default function ItemOrder({ item: { item } }: any) {
    const date = new Date(item.created_at).toLocaleString();
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(ROUTER.ORDER_DETAIL_SCREEN, { data: item })}
            style={tw`flex flex-row items-center py-2.5 bg-white border-b border-slate-100`}
        >
            <View style={tw`flex-1 px-1`}>
                <Text numberOfLines={1} style={tw`text-center text-base text-black`}>{item.order_id}</Text>
            </View>
            <View style={tw`flex-1 px-1`}>
                <Text numberOfLines={1} style={tw`text-center text-base text-black`}>{date}</Text>
            </View>
            <View style={tw`w-25 px-1`}>
                <Text
                    numberOfLines={1}
                    style={tw`text-center text-base text-${item.status === 0 ? 'yellow-500'
                        : item.status === 1 ? 'blue-500'
                            : item.status === 2 ? 'green-500'
                                : item.status === 3 ? 'red-500'
                                    : item.status === 4 ? 'red-500' : 'yellow-500'}`}
                >
                    {
                        item.status === 0 ? 'Processing'
                            : item.status === 1 ? 'Delivering'
                                : item.status === 2 ? 'Delivered'
                                    : item.status === 3 ? 'Cancelled'
                                        : item.status === 4 ? 'Refund' : 'Undefined'
                    }
                </Text>
            </View>
            <View style={tw`w-22 px-1`}>
                <Text numberOfLines={1} style={tw`text-center text-base text-black`}>{formatNumber(item.total_price)}</Text>
            </View>
        </TouchableOpacity>
    )
}