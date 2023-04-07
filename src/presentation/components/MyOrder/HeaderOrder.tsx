import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { COLOR } from '../../constants'

export default function HeaderOrder() {
    return (
        <View style={tw`flex flex-row items-center bg-[#fafafa] border-b border-slate-100`}>
            <View style={tw`flex-1 px-1`}>
                <Text style={tw`text-center text-[${COLOR.BLACK}] text-xl font-medium`}>Order</Text>
            </View>
            <View style={tw`flex-1 px-1`}>
                <Text style={tw`text-center text-[${COLOR.BLACK}] text-xl font-medium`}>Booking date</Text>
            </View>
            <View style={tw`w-25 px-1`}>
                <Text style={tw`text-center text-[${COLOR.BLACK}] text-xl font-medium`}>Status</Text>
            </View>
            <View style={tw`w-22 px-1`}>
                <Text style={tw`text-center text-[${COLOR.BLACK}] text-xl font-medium`}>Total</Text>
            </View>
        </View>
    )
}