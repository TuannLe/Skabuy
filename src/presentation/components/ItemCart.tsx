import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CheckBox from '@react-native-community/checkbox';
import { COLOR } from '../constants';

export default function ItemCart({ price, setSubTotal, subTotal }: any) {
    const [isSelected, setSelection] = useState(false);
    const [quantity, onChangeQuantity] = useState(1);

    const handlePlus = () => {
        onChangeQuantity(quantity + 1)
        setSubTotal(price * (quantity + 1))
    }

    const handleMinus = () => {
        if (quantity > 1) {
            onChangeQuantity(quantity - 1)
            setSubTotal(price * (quantity - 1))
        }
        if (quantity === 1) {
            console.log('hr')
        }
    }

    const showConfirmDialog = () => {
        return Alert.alert(
            "Confirm",
            "Are you sure you want to delete item?",
            [
                {
                    text: "Yes",
                    onPress: () => {
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
                style={{ width: 120, height: 120 }}
                source={{ uri: 'https://cafebiz.cafebizcdn.vn/zoom/700_438/162123310254002176/2022/6/18/photo1655524983258-16555249833711967616300.jpg' }}
            />
            <View style={tw`flex-1 px-3`}>
                <Text
                    style={tw`text-2xl text-black font-medium`}
                    numberOfLines={1}
                >
                    Product name
                </Text>
                <Text style={tw`text-lg`}>Loai</Text>
                <View style={tw`flex flex-row items-center`}>
                    <Text style={tw`text-2xl line-through mr-2`}>60$</Text>
                    <Text style={tw`text-2xl text-red-600 font-bold`}>{subTotal}$</Text>
                </View>
                <View style={tw`box-border flex-row h-10 mt-3`}>
                    <TouchableOpacity onPress={() => handleMinus()} style={tw`bg-[#17a2b8] rounded items-center w-10 justify-center`}>
                        <Ionicons name='remove-outline' style={tw`text-xl font-black text-[${COLOR.WHITE}]`} />
                    </TouchableOpacity>
                    <View style={tw`bg-[#F5F5F5] w-12 justify-center`}>
                        <Text style={tw`text-xl text-black text-center`}>{quantity}</Text>
                    </View>

                    <TouchableOpacity onPress={() => handlePlus()} style={tw`bg-[#17a2b8] rounded items-center w-10 justify-center`}>
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