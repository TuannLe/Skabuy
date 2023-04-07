import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import tw from 'twrnc'
import ItemOrder from './ItemOrder';
import HeaderOrder from './HeaderOrder';

export default function AllOrder() {
    const data = useSelector((state: any) => state.user.orders)
    return (
        <View style={tw`w-full h-full`}>
            <HeaderOrder />
            <View>
                <FlatList
                    data={data}
                    renderItem={(item) => <ItemOrder item={item} />}
                    keyExtractor={item => item.product_id}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}