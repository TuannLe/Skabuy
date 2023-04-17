import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation, DrawerActions } from '@react-navigation/native';
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
            const encoded = btoa(JSON.stringify(data));
            const response = await searchProduct(encoded)
            if (response.status == "success") {
                setSearch('')
                let maxProduct = response.data.reduce((max: any, el: any) =>
                    max.product_price > el.product_price ? max : el
                );
                navigation.navigate(ROUTER.SEARCH_RESULT_SCREEN, { productList: response.data, keyword: data.keyword, maxPrice: maxProduct.product_price })
            } else {
                setWarn(response.message);
            }
        }
    }

    return (
        <View style={tw`flex flex-row items-center bg-[${COLOR.PRIMARY}] `}>
            <View style={tw`flex-1 justify-center items-center`}>
                <TouchableOpacity
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                    style={tw`p-1.5 `}
                >
                    <Ionicons name='menu-outline' size={40} style={tw`text-white`} />
                </TouchableOpacity>
            </View>
            <View style={tw`w-76 flex flex-row items-center rounded-full bg-white px-3 `}>
                <TextInput
                    placeholder='Search...'
                    value={search}
                    onChangeText={(val) => setSearch(val)}
                    style={tw`flex-1 text-base py-1.5`}
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
                        style={tw`p-1.5`}
                        onPress={() => navigation.navigate(ROUTER.CART_TAB)}
                    >
                        <Feather name='shopping-cart' style={tw`text-3xl text-white`} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={tw`flex-1 justify-center items-center`}>
                    <TouchableOpacity
                        style={tw`p-1.5`}
                        onPress={() => navigation.navigate(ROUTER.LOGIN)}
                    >
                        <Feather name="user" style={tw`text-3xl text-white`} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}