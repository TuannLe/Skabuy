import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { decode as atob, encode as btoa } from 'base-64'
import { ROUTER, COLOR } from '../constants'
import { divPriceToArray } from '../../util/helper'
import { ItemFilter4 } from '../components/Filter';
import { searchProduct } from '../../core/api/ProductApi'

export default function FilterSearchScreen({ route, navigation }: any) {
    const { maxPrice, keyword, setData } = route.params
    const [selectedPrice, setSelectedPrice] = useState([]);

    const handleSearch = async () => {
        if (keyword) {
            const data = {
                keyword: keyword,
                price: selectedPrice,
            }
            const encoded = btoa(JSON.stringify(data));
            const response = await searchProduct(encoded)
            if (response.status == "success") {
                setData(response.data);
            }
        }
    }

    const onSelectPriceHandler = (newPrice: any) => {
        const foundIndex = selectedPrice.findIndex(
            (el: any) =>
                Object.entries(el).toString() == Object.entries(newPrice).toString()
        );

        if (foundIndex != -1) {
            let pricesArr = selectedPrice;
            pricesArr.splice(foundIndex, 1);
            setSelectedPrice(pricesArr);
        } else {
            setSelectedPrice((current): any => [...current, newPrice]);
        }
    };

    const handleApply = () => {
        handleSearch();
        navigation.goBack()
    }

    // const handleReset = () => {
    //     dispatch(ACT_PRODUCT.GetProductByCategoryStart(IDCategory))
    //     navigation.goBack()
    // }

    return (
        <View style={tw`w-full h-full`}>
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-3 pr-8 `}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="ios-close-outline" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>Filter</Text>
            </View>
            <ScrollView style={tw`w-full p-2 bg-white`}>
                <View style={tw`mt-3`}>
                    <Text style={tw`text-xl text-black font-medium ml-1`}>Filter by Price</Text>
                    <View style={tw`w-full flex-row flex-wrap`}>
                        {divPriceToArray(maxPrice).map((item, index) => {
                            return (
                                <View
                                    style={tw`w-1/2`}
                                    key={index}
                                >
                                    <ItemFilter4 item={item} onSelectPriceHandler={onSelectPriceHandler} />
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <View style={tw`flex flex-row items-center bg-slate-50 p-3`}>
                <TouchableOpacity
                    // onPress={handleReset}
                    style={tw`flex-1 py-3 border border-[${COLOR.PRIMARY}] rounded mr-1`}
                >
                    <Text style={tw`text-base text-[${COLOR.PRIMARY}] font-medium text-center`}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleApply}
                    style={tw`flex-1 py-3 bg-[${COLOR.PRIMARY}] rounded ml-1`}
                >
                    <Text style={tw`text-base text-[${COLOR.WHITE}] font-medium text-center`}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}