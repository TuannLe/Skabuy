import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { decode as atob, encode as btoa } from 'base-64'
import { useSelector } from "react-redux";
import { ROUTER, COLOR } from '../constants'
import { searchProduct } from '../../core/api/ProductApi'

export default function Header() {
    const navigation = useNavigation();
    const [search, setSearch] = useState('')
    const [selectedPrice, setSelectedPrice] = useState([]);
    const [warn, setWarn] = useState('')

    const token = useSelector((state: any) => state.auth.token)
    const infoUser = useSelector((state: any) => state.auth.infoUser)

    const handleSearch = async () => {
        if (search) {
            const data = {
                keyword: search,
                price: selectedPrice,
            }
            setSearch('')
            const encoded = btoa(JSON.stringify(data));
            const response = await searchProduct(encoded)
            if (response.status == "success") {
                navigation.navigate(ROUTER.SEARCH_RESULT_SCREEN, { productList: response.data, keyword: data.keyword })
            } else {
                setWarn(response.message);
            }
        }
    }

    return (
        <View style={tw`flex flex-row items-center bg-[${COLOR.PRIMARY}] `}>
            <View style={tw`flex-1 justify-center items-center`}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={tw`p-2 `}
                >
                    <Ionicons name='menu-outline' size={50} style={tw`text-white`} />
                </TouchableOpacity>
            </View>
            <View style={tw`w-76 flex flex-row items-center rounded-full bg-white px-3 `}>
                <TextInput
                    placeholder='Search...'
                    value={search}
                    onChangeText={(val) => setSearch(val)}
                    style={tw`flex-1 text-base`}
                />
                <TouchableOpacity
                    onPress={handleSearch}
                >
                    <Ionicons name='search' style={tw`text-xl text-gray-400`} />
                </TouchableOpacity>
            </View>
            {token && infoUser ? (
                <View style={tw`flex-1 justify-center items-center`}>
                    <TouchableOpacity
                        style={tw`p-2`}
                        onPress={() => navigation.navigate(ROUTER.CART_TAB)}
                    >
                        <Feather name='shopping-cart' style={tw`text-4xl text-white`} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={tw`flex-1 justify-center items-center`}>
                    <TouchableOpacity
                        style={tw`p-2`}
                        onPress={() => navigation.navigate(ROUTER.LOGIN)}
                    >
                        <Feather name="user" style={tw`text-4xl text-white`} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}