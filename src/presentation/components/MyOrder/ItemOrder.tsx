import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import {
    formatNumber
} from "../../../util/helper";
import { getOrderDetail } from '../../../core/api/cartAPI'
import { COLOR, ROUTER } from '../../constants';

export default function ItemOrder({ item: { item } }: any) {
    const date = new Date(item.created_at).toLocaleString();
    const navigation = useNavigation()
    const handleGetOrderDetail = async (orderId: any) => {
        const response = await getOrderDetail(orderId)
        if (response.status === 'success') {
            navigation.navigate(ROUTER.ORDER_DETAIL_SCREEN, { data: item, detail: response.data })
        }
    }

    return (
        <TouchableOpacity
            onPress={() => handleGetOrderDetail(item.order_id)}
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
        //     <View style={tw`w-full bg-white px-3 py-1.5 mb-2`}>
        //     <View style={tw`flex flex-row justify-between items-center border-b border-slate-100 pb-2`}>
        //         <Text style={tw`text-base font-medium text-black`}>14-05-2023</Text>
        //         <Text style={tw`text-base font-medium text-yellow-400`}>Processing</Text>
        //     </View>
        //     <View style={tw`w-full flex flex-row border-b border-slate-100 py-1`}>
        //         <Image
        //             source={{ uri: 'https://res.cloudinary.com/dwd5gmp97/image/upload/v1678683579/dmw29p4j8oq0fcvycxtr.webp' }}
        //             style={tw`w-15 h-15`}
        //             resizeMode={'contain'}
        //         />
        //         <View style={tw`flex-1 pl-3`}>
        //             <Text
        //                 style={tw`text-lg text-black font-400`}
        //                 numberOfLines={1}
        //             >
        //                 Solartec Outdoor Rectangle Pet Cot Rectangle Pet Cot
        //             </Text>
        //             <View style={tw`flex flex-row items-center justify-between`}>
        //                 <Text numberOfLines={1} style={tw`text-base`}>size 24 x 18</Text>
        //                 <Text style={tw`text-[${COLOR.PRIMARY}]`}>$200</Text>
        //             </View>
        //         </View>
        //     </View>
        //     <View style={tw`flex flex-row items-center justify-between`}>
        //         <Text>2 products</Text>
        //         <View style={tw`flex flex-row items-center`}>
        //             <Text style={tw`text-base text-black mr-2`}>Total:</Text>
        //             <Text style={tw`text-lg font-500 text-[${COLOR.PRIMARY}]`}>$400</Text>
        //         </View>
        //     </View>
        // </View>
    )
}