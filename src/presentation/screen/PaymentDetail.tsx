import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { formatNumber } from '../../util/helper';
import { ROUTER, COLOR } from '../constants'

export default function PaymentDetail({ route, navigation }: any) {
    const { subTotal, total, userInfor } = route.params

    const handleCheckout = () => {
        navigation.navigate(ROUTER.WEBVIEW_SCREEN)
    }
    return (
        <View style={tw`relative w-full h-full`}>
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-4 pr-8`}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>Payment</Text>
            </View>
            <ScrollView style={tw`px-3`}>
                <View style={tw`mt-3`}>
                    <Text style={tw`text-2xl text-[${COLOR.BLACK}] font-medium`}>Payment Address</Text>
                    <View style={tw`mt-3`}>
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Full name</Text>
                        <View
                            style={tw`border border-[#b1becb] px-2 py-2.5 text-base text-black bg-gray-200 rounded`}
                        >
                            <Text style={tw`text-base text-black`}>{userInfor.user_fullname}</Text>
                        </View>
                    </View>
                    <View style={tw`mt-2`}>
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Phone number</Text>
                        <View
                            style={tw`border border-[#b1becb] px-2 py-2.5 text-base text-black bg-gray-200 rounded`}
                        >
                            <Text style={tw`text-base text-black`}>{userInfor.user_phone_number}</Text>
                        </View>
                    </View>
                    <View style={tw`mt-2`}>
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Email</Text>
                        <View
                            style={tw`border border-[#b1becb] px-2 py-2.5 text-base text-black bg-gray-200 rounded`}
                        >
                            <Text style={tw`text-base text-black`}>{userInfor.user_email}</Text>
                        </View>
                    </View>
                    <View style={tw`mt-2`}>
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Address</Text>
                        <View
                            style={tw`border border-[#b1becb] px-2 py-2.5 text-base text-black bg-gray-200 rounded`}
                        >
                            <Text style={tw`text-base text-black`}>
                                {`${userInfor.user_address}, ${userInfor.user_apt}, ${userInfor.user_city}, ${userInfor.user_state}, ${userInfor.user_zipCode}`}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={tw`mt-3`}>
                    <Text style={tw`text-2xl text-[${COLOR.BLACK}] font-medium`}>Order Total</Text>
                    <View style={tw`border-b border-gray-300 pb-3 pt-2`}>
                        <Text style={tw`text-xl text-[${COLOR.BLACK}]`}>Products</Text>
                        <View style={tw`flex flex-row items-center justify-between`}>
                            <Text style={tw`text-base`}>name</Text>
                            <Text style={tw`text-base`}>Prize</Text>
                        </View>
                        <View style={tw`flex flex-row items-center justify-between`}>
                            <Text style={tw`text-base`}>name</Text>
                            <Text style={tw`text-base`}>Prize</Text>
                        </View>
                        <View style={tw`flex flex-row items-center justify-between`}>
                            <Text style={tw`text-base`}>name</Text>
                            <Text style={tw`text-base`}>Prize</Text>
                        </View>
                        <View style={tw`flex flex-row items-center justify-between`}>
                            <Text style={tw`text-base`}>name</Text>
                            <Text style={tw`text-base`}>Prize</Text>
                        </View>
                        <View style={tw`flex flex-row items-center justify-between`}>
                            <Text style={tw`text-base`}>name</Text>
                            <Text style={tw`text-base`}>Prize</Text>
                        </View>
                        <View style={tw`flex flex-row items-center justify-between`}>
                            <Text style={tw`text-base`}>name</Text>
                            <Text style={tw`text-base`}>Prize</Text>
                        </View>
                        <View style={tw`flex flex-row items-center justify-between`}>
                            <Text style={tw`text-base`}>name</Text>
                            <Text style={tw`text-base`}>Prize</Text>
                        </View>
                        <View style={tw`flex flex-row items-center justify-between`}>
                            <Text style={tw`text-base`}>name</Text>
                            <Text style={tw`text-base`}>Prize</Text>
                        </View>
                    </View>
                    <View style={tw`border-b border-gray-300 py-3`}>
                        <View style={tw`flex flex-row items-center justify-between mb-1`}>
                            <Text style={tw`text-xl text-[${COLOR.BLACK}]`}>Subtotal:</Text>
                            <Text style={tw`text-xl text-[${COLOR.BLACK}]`}>{formatNumber(subTotal)}</Text>
                        </View>
                        <View style={tw`flex flex-row items-center justify-between`}>
                            <Text style={tw`text-xl text-[${COLOR.BLACK}]`}>Shipping:</Text>
                            <Text style={tw`text-xl text-[${COLOR.BLACK}]`}>Free ship</Text>
                        </View>
                    </View>
                    <View style={tw`flex flex-row items-center justify-between my-2`}>
                        <Text style={tw`text-2xl text-[${COLOR.BLACK}] font-medium`}>Total:</Text>
                        <Text style={tw`text-3xl text-[${COLOR.BLACK}] font-medium`}>{formatNumber(total)}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={tw`px-3`}>
                <TouchableOpacity
                    onPress={() => handleCheckout()}
                    style={tw`p-3 bg-[${COLOR.PRIMARY}] my-3 rounded-md`}
                >
                    <Text style={tw`text-white text-xl font-medium text-center`}>Process To Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}