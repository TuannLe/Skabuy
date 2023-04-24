import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { decode as atob, encode as btoa } from 'base-64'
import { ROUTER, COLOR } from '../constants'
import { divPriceToArray } from '../../util/helper'
import { ItemFilter4 } from '../components/Filter';
import { getProductAll, getPopularAll, getBestSellingItems } from '../../core/api/ProductApi'

export default function FilterAllScreen({ route, navigation }: any) {
    const { maxPrice, setData, percent } = route.params
    const [selectedPrice, setSelectedPrice] = useState([]);
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [monthStart, setmonthStart] = useState('')
    const [monthEnd, setmonthEnd] = useState('')

    const getCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        setDateStart(year + '-' + month + '-' + (date - 7))
        setDateEnd(year + '-' + month + '-' + date)
        setmonthStart(year + '-' + (month - 1) + '-' + date)
        setmonthEnd(year + '-' + month + '-' + date)
    }
    useEffect(() => {
        getCurrentDate()
    }, [])

    const handleFilter = async (slug: any) => {
        const data = {
            price: selectedPrice
        }
        var response
        const encode = btoa(JSON.stringify(data))
        const postData = {
            data: {
                start: "2023-1-1",
                end: "2030-1-1",
                full: 0,
                price: selectedPrice
            }
        }
        const postDataWeek = {
            data: {
                start: dateStart,
                end: dateEnd,
                full: 1,
                price: []
            }
        }
        const postDataMonth = {
            data: {
                start: monthStart,
                end: monthEnd,
                full: 1,
                price: []
            }
        }
        switch (slug) {
            case 30:
                response = await getProductAll({ encode: encode, percent: slug })
                if (response.status === 'success') {
                    setData(response.data);
                }
                break;
            case 20:
                response = await getProductAll({ encode: encode, percent: slug })
                if (response.status === 'success') {
                    setData(response.data);
                }
                break;
            case 15:
                response = await getProductAll({ encode: encode, percent: slug })
                if (response.status === 'success') {
                    setData(response.data);
                }
                break;
            case 'popular':
                response = await getPopularAll(encode)
                if (response.status === 'success') {
                    setData(response.data);
                }
                break;
            case 'best_selling':
                response = await getBestSellingItems(postData)
                if (response.status === 'success') {
                    setData(response.data);
                }
            case 'best_selling_month':
                response = await getBestSellingItems(postDataMonth)
                if (response.status === 'success') {
                    setData(response.data);
                }
            case 'best_selling_week':
                response = await getBestSellingItems(postDataWeek)
                if (response.status === 'success') {
                    setData(response.data);
                }
                break;
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
        handleFilter(percent)
        navigation.goBack()
    }

    const handleReset = async () => {
        const data = {
            price: []
        }
        const encode = btoa(JSON.stringify(data))
        const postData = {
            data: {
                start: "2023-1-1",
                end: "2030-1-1",
                full: 1,
                price: []
            }
        }
        const postDataWeek = {
            data: {
                start: dateStart,
                end: dateEnd,
                full: 1,
                price: []
            }
        }
        const postDataMonth = {
            data: {
                start: monthStart,
                end: monthEnd,
                full: 1,
                price: []
            }
        }
        var response
        if (percent === 15 || percent === 20 || percent === 30) {
            response = await getProductAll({ encode: encode, percent: percent })
        } else if (percent === 'popular') {
            response = await getPopularAll(encode)
        } else if (percent === 'best_selling') {
            response = await getBestSellingItems(postData)
        } else if (percent === 'best_selling_month') {
            response = await getBestSellingItems(postDataMonth)
        } else if (percent === 'best_selling_week') {
            response = await getBestSellingItems(postDataWeek)
        }
        if (response.status === 'success') {
            setData(response.data);
            navigation.goBack()
        }
    }

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
                    onPress={handleReset}
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