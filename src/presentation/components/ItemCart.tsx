import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from '../constants';

export default function ItemCart({ handleChangeQuantity, data }: any) {
    const dispatch = useDispatch()
    const [isSelected, setSelection] = useState(false);

    const showConfirmDialog = () => {
        return Alert.alert(
            "Confirm",
            "Are you sure you want to delete item?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(ACT_CART.RemoveItemCart(data.product_id))
                        return
                    }
                },
                {
                    text: "No",
                    onPress: () => {
                        return
                    }
                }
            ]
        )
    }

    const handleDeleteItem = () => {
        showConfirmDialog()
    }

    return (
        <View style={tw`w-full bg-white flex flex-row items-center py-3 pl-3 mt-3`}>
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                boxType="circle"
                style={tw`mr-5`}
                onFillColor="#fff"
                onCheckColor="#333"
                onTintColor="#333"
                tintColor="white"
            />
            <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: data.product_image }}
            />
            <View style={tw`flex-1 px-3`}>
                <Text
                    style={tw`text-2xl text-black font-medium`}
                    numberOfLines={1}
                >
                    {data.product_name}
                </Text>
                <Text numberOfLines={1} style={tw`text-base`}>{data.characteristics.values}</Text>
                <View style={tw`flex flex-row items-center`}>
                    <Text style={tw`text-2xl line-through mr-2`}>${data.price}</Text>
                    <Text style={tw`text-2xl text-red-600 font-bold`}>${data.totalprice}$</Text>
                </View>
                <View style={tw`flex-row h-10 mt-3`}>
                    <TouchableOpacity
                        onPress={() => handleChangeQuantity(
                            data.quantity - 1,
                            data.product_id
                        )}
                        style={tw`bg-[#17a2b8] rounded items-center w-10 justify-center`}
                    >
                        <Ionicons name='remove-outline' style={tw`text-xl font-black text-[${COLOR.WHITE}]`} />
                    </TouchableOpacity>
                    <View style={tw`bg-[#F5F5F5] w-12 justify-center`}>
                        <Text style={tw`text-xl text-black text-center`}>{data.quantity}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (!(data.quantity >= data.characteristics.total)) {
                                handleChangeQuantity(
                                    data.quantity + 1,
                                    data.product_id
                                )
                            }
                        }}
                        style={tw`bg-[#17a2b8] rounded items-center w-10 justify-center`}
                    >
                        <Ionicons name='add-outline' style={tw`text-xl font-black text-[${COLOR.WHITE}]`} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={tw`p-3`}
                onPress={() => handleDeleteItem()}
            >
                <Ionicons name='trash-outline' style={tw`text-red-500 text-3xl`} />
                {/* <Text style={tw`text-red-500 text-xl font-medium`}>Delete</Text> */}
            </TouchableOpacity>
        </View>
    )
}