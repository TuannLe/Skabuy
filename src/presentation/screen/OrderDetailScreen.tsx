import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { formatNumber } from '../../util/helper';
import { ROUTER, COLOR } from '../constants'
import OrderDetailItem from '../components/MyOrder/OrderDetailItem';

export default function OrderDetailScreen({ route, navigation }: any) {
    const { data, detail } = route.params
    return (
        <View style={tw`w-full h-full`}>
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-4 pr-8`}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>Order detail</Text>
            </View>
            <ScrollView>
                <View style={tw`p-3 bg-white`}>
                    <Text style={tw`text-xl text-black font-bold mb-3`}>{data.order_id}</Text>
                    <View style={tw`w-full mb-3x`}>
                        <View style={tw`flex flex-row mt-2`}>
                            <Text style={tw`text-lg text-black w-40 font-medium`}>To:</Text>
                            <Text style={tw`text-lg text-black flex-1`}>{data.fullname}</Text>
                        </View>
                        <View style={tw`flex flex-row mt-2`}>
                            <Text style={tw`text-lg text-black w-40 font-medium`}>Address:</Text>
                            <Text style={tw`text-lg text-black flex-1`}>{data.address}</Text>
                        </View>
                        {/* <View style={tw`flex flex-row mt-2`}>
                            <Text style={tw`text-lg text-black w-40 font-medium`}>Message:</Text>
                            <Text style={tw`text-lg text-black flex-1`}></Text>
                        </View> */}
                        <View style={tw`flex flex-row mt-2`}>
                            <Text style={tw`text-lg text-black w-40 font-medium`}>Payment method:</Text>
                            <Text style={tw`text-lg text-black flex-1`}>
                                {data.method_payment == 0 ?
                                    "Cash on delivery" :
                                    data.method_payment == 1 ?
                                        "Pay with Paypal"
                                        : "Pay with VNPay"
                                }
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={tw`w-full mt-2 bg-white p-3`}>
                    <View style={tw`bg-white py-1.5`}>
                        <View style={tw`flex flex-row justify-between items-center border-b border-slate-100 pb-2`}>
                            <Text style={tw`text-base font-medium text-black`}>14-05-2023</Text>
                            <Text
                                numberOfLines={1}
                                style={tw`text-base font-medium text-${data.status === 0 ? 'yellow-500'
                                    : data.status === 1 ? 'blue-500'
                                        : data.status === 2 ? 'green-500'
                                            : data.status === 3 ? 'red-500'
                                                : data.status === 4 ? 'red-500' : 'yellow-500'}`}
                            >
                                {
                                    data.status === 0 ? 'Processing'
                                        : data.status === 1 ? 'Delivering'
                                            : data.status === 2 ? 'Delivered'
                                                : data.status === 3 ? 'Cancelled'
                                                    : data.status === 4 ? 'Refund' : 'Undefined'
                                }
                            </Text>
                        </View>
                        {detail.length ? (
                            <FlatList
                                data={detail}
                                renderItem={(item) => <OrderDetailItem item={item.item} />}
                                keyExtractor={item => item.category_id}
                            />
                        ) : null}
                    </View>
                    <View>
                        <View style={tw`flex flex-row justify-between mt-2`}>
                            <Text style={tw`text-lg text-black font-medium`}>Subtotal:</Text>
                            <Text style={tw`text-lg text-black`}>{formatNumber(data.total_price)}</Text>
                        </View>
                        <View style={tw`flex flex-row justify-between mt-2`}>
                            <Text style={tw`text-lg text-black font-medium`}>Shipping:</Text>
                            <Text style={tw`text-lg text-black`}>{formatNumber(0)}</Text>
                        </View>
                        <View style={tw`flex flex-row justify-between mt-2`}>
                            <Text style={tw`text-2xl text-black font-medium`}>Total:</Text>
                            <Text style={tw`text-2xl text-black font-medium`}>{formatNumber(data.total_price)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}