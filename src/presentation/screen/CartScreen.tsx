import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from "react-redux";
import ItemCart from '../components/ItemCart'
import { COLOR } from '../constants'

export default function CartScreen({ navigation }: any) {
    const dispatch = useDispatch()
    const price = 50;
    const [isSelected, setSelection] = useState(false);
    const [subTotal, setSubTotal] = useState(price)

    const [total, setTotal] = useState(subTotal)
    const ArrayProduct = useSelector((state: any) => state.cart.products)
    console.log(ArrayProduct)

    return (
        <View style={tw`relative w-full h-full`}>
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-4 pr-8`}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-bold text-white text-center`}>Cart</Text>
            </View>
            <View style={tw`flex flex-row items-center justify-between bg-white pl-3 mt-3`}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    disabled={false}
                    boxType="circle"
                    style={tw``}
                    onCheckColor="#fff"
                    onTintColor="#fff"
                    tintColor="#fff"
                />
                <TouchableOpacity
                    style={tw`p-3`}
                >
                    <Text style={tw`text-xl text-gray-500 font-medium`}>Delete all</Text>
                </TouchableOpacity>
            </View>
            {ArrayProduct.length ? (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={ArrayProduct}
                    keyExtractor={(item, index) => item.product_id}
                    renderItem={({ item }) => {
                        return <ItemCart data={item} setSubTotal={setSubTotal} subTotal={subTotal} />;
                    }}
                    style={tw`mb-78`}
                />
            ) : (
                <></>
            )}
            {/* <ScrollView style={tw`mb-78`}>
            
            </ScrollView> */}
            <View style={tw`absolute bg-gray-100 bottom-0 left-0 right-0 h-78`}>
                <View style={tw`flex flex-row my-1`}>
                    <TextInput
                        placeholder="Voucher code..."
                        style={tw`flex-1 p-3 text-lg bg-white`}
                    />
                    <TouchableOpacity
                        style={tw`p-3 bg-[${COLOR.PRIMARY}]`}
                    >
                        <Text style={tw`text-white text-lg font-medium`}>Apply voucher</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`h-full bg-white px-3`}>
                    <Text style={tw`text-3xl text-black font-medium mb-3`}>Cart Summary</Text>
                    <View style={tw`flex flex-row items-center justify-between`}>
                        <Text style={tw`text-black text-xl`}>Subtotal</Text>
                        <Text style={tw`text-black text-xl font-medium`}>$80</Text>
                    </View>
                    <View style={tw`flex flex-row items-center justify-between py-3 border-b border-gray-300`}>
                        <Text style={tw`text-black text-xl`}>Shipping</Text>
                        <Text style={tw`text-black text-xl font-medium`}>$0</Text>
                    </View>
                    <View style={tw`flex flex-row items-center justify-between mt-3`}>
                        <Text style={tw`text-black text-3xl font-medium`}>Total</Text>
                        <Text style={tw`text-red-600 text-3xl font-medium`}>${total}</Text>
                    </View>
                    <TouchableOpacity
                        style={tw`p-3 bg-[${COLOR.PRIMARY}] my-3 rounded-md`}
                    >
                        <Text style={tw`text-white text-xl font-medium text-center `}>Proceed To Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}