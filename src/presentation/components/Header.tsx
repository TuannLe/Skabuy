import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { ROUTER } from '../constants'

export default function Header() {
    const [showBar, setShowBar] = useState(false)
    const navigation = useNavigation();
    return (
        <View style={tw`flex flex-row items-center bg-[#17a2b8] p-3`}>
            <Text style={tw`text-white`}>Logo</Text>
            <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={tw`p-2`}
            >
                <Ionicons name='menu-outline' style={tw`text-3xl text-white`} />
            </TouchableOpacity>
            <View style={tw`flex flex-row flex-1 items-center rounded-full bg-white px-3`}>
                <TextInput
                    placeholder='Search...'
                    style={tw`flex-1 text-base`}
                />
                <TouchableOpacity>
                    <Ionicons name='search' style={tw`text-xl text-gray-400`} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={tw`p-2`}
                onPress={() => navigation.navigate(ROUTER.CART_TAB)}
            >
                <Feather name='shopping-cart' style={tw`text-2xl text-white`} />
            </TouchableOpacity>
        </View>
    )
}