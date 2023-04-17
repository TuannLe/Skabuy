import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ItemProduct from '../components/ItemProduct'
import { ROUTER, COLOR } from '../constants'

export default function SearchResultScreen({ route, navigation }: any) {
    const { productList, keyword, maxPrice } = route.params
    const [data, setData] = useState(productList)
    return (
        <View style={tw`w-full h-full`}>
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-4 pr-8`}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>Search result</Text>
            </View>
            <View style={tw`flex flex-row bg-white pr-3`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTER.FILTER__SEARCH_SCREEN, { maxPrice: maxPrice, keyword, setData })}
                    style={tw`flex flex-row items-center p-2`}
                >
                    <AntDesign name='filter' style={tw`text-2xl`} />
                    <Text style={tw`text-lg font-medium`}>Filter</Text>
                </TouchableOpacity>
                <View style={tw`flex-1 `}>

                </View>
            </View>
            <View style={tw`px-2.5 mb-13`}>
                <Text style={tw`text-black text-base px-1 mt-2`}>
                    {`Found ${data.length} ${data.length > 1 ? "products" : "product"} with keyword "${keyword}" `}
                </Text>
                {
                    data?.length
                        ? (
                            <FlatList
                                data={data}
                                numColumns={3}
                                renderItem={(item) => <ItemProduct item={item.item} />}
                                keyExtractor={item => item.product_id}
                                showsHorizontalScrollIndicator={false}
                            />
                        )
                        : (
                            <View style={tw`flex-1 justify-center h-full`}>
                                <Text style={tw`text-lg font-medium text-center`}>You don't have favorite item</Text>
                            </View>
                        )
                }
            </View>
        </View>
    )
}