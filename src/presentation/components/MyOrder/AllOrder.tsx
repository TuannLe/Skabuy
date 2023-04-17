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
            {data.length ? (
                <>
                    <HeaderOrder />
                    <View style={tw``}>
                        <FlatList
                            data={data}
                            renderItem={(item) => <ItemOrder item={item} />}
                            keyExtractor={item => item.product_id}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </>
            ) : (
                <View style={tw`w-full h-full flex justify-center items-center`}>
                    <Text style={tw`text-base text-black`}>You don't have any orders yet</Text>
                </View>
            )}
        </View>
    )
}