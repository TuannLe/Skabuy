import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CheckBox } from '@rneui/themed';
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from '../constants';
import {
    formatNumber
} from "../../util/helper";
import * as ACT_CART from '../../core/redux/actions/cart'

export default function ItemCart({ arrayCheckout, setArrayCheckout, loadTotalPayment, data }: any) {
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false);

    const toggleCheckbox = () => {
        setChecked(!checked)
        if (!checked) {
            let arr = arrayCheckout
            arr.push(data)
            setArrayCheckout(arr)
            loadTotalPayment()
        } else {
            let arr = arrayCheckout
            arr.splice(arr.findIndex((item: any) => {
                return item.product_id == data.product_id
            }), 1)
            setArrayCheckout(arr)
            loadTotalPayment()
        }
    };

    const showConfirmDialog = () => {
        return Alert.alert(
            "Confirm",
            "Are you sure you want to delete item?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(ACT_CART.RemoveItemCart(data))
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
    const [quantity, setQuantity] = useState(data.quantity)
    const handleChangeQuantity = (quantity: any, productID: any) => {
        if (quantity > 0) {
            dispatch(ACT_CART.ChangeQuantity({ quantity, productID }))
            loadTotalPayment()
        } else {
            showConfirmDialog()
        }
    }

    return (
        <View style={tw`w-full bg-white flex flex-row items-center py-3 mt-3`}>
            <CheckBox
                checked={checked}
                onPress={toggleCheckbox}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="green"
                size={32}
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
                    <Text style={tw`text-2xl line-through mr-2`}>{formatNumber(data.price)}</Text>
                    <Text style={tw`text-2xl text-red-600 font-bold`}>{formatNumber(data.totalprice)}$</Text>
                </View>
                <View style={tw`flex-row mt-3`}>
                    <TouchableOpacity
                        onPress={() => {
                            setQuantity(quantity - 1)
                            handleChangeQuantity(
                                data.quantity - 1,
                                data.product_id
                            )
                        }}
                        style={tw`bg-[#17a2b8] px-1.5 py-1 rounded items-center justify-center`}
                    >
                        <Ionicons name='remove-outline' style={tw`text-xl font-black text-[${COLOR.WHITE}]`} />
                    </TouchableOpacity>
                    <View style={tw`bg-[#F5F5F5] w-12 justify-center`}>
                        <Text style={tw`text-xl text-black text-center`}>{data.quantity}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (!(data.quantity >= data.characteristics.total)) {
                                setQuantity(quantity + 1)
                                handleChangeQuantity(
                                    data.quantity + 1,
                                    data.product_id
                                )
                            }
                        }}
                        style={tw`bg-[#17a2b8] px-1.5 py-1 rounded items-center justify-center`}
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