import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import { decode as atob, encode as btoa } from 'base-64'
import { getProductsWithFilter } from '../../core/api/ProductApi'
import { ROUTER, COLOR } from '../constants'
import { divPriceToArray } from '../../util/helper'
import * as ACT_PRODUCT from '../../core/redux/actions/product'

export default function FilterScreen({ route, navigation }: any) {
    const dispatch = useDispatch()
    const data_attributes = useSelector((state: any) => state.product.attributes)
    const IDCategory = route.params.IDCategory
    const [selectedAttribute, setSelectedAttribute] = useState({
        category_id: IDCategory,
        attributes: {},
    });

    const onSelectAttributeHandler = async (
        attributeID: any,
        attributeType: any,
        attributeValue: any
    ) => {
        var attributes = selectedAttribute.attributes;
        const foundAttribute = Object.keys(attributes).find(
            (el) => el == attributeType
        );

        if (foundAttribute) {
            var foundValue = attributes[foundAttribute].data.find(
                (el: any) =>
                    Object.entries(el).toString() ==
                    Object.entries(attributeValue).toString()
            );
            if (foundValue) {
                const foundIndex = attributes[foundAttribute].data.indexOf(foundValue);
                if (foundIndex != -1) {
                    attributes[foundAttribute].data.splice(foundIndex, 1);
                }
            } else {
                attributes[foundAttribute].data.push(attributeValue);
            }
        } else {
            attributes[attributeType] = {
                id: attributeID,
                data: [attributeValue],
            };
        }
        const encoded = btoa(JSON.stringify(selectedAttribute));
        dispatch(ACT_PRODUCT.getProductsWithFilterStart(encoded))
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
            <ScrollView style={tw`p-2 bg-white`}>
                <View style={tw`mt-3`}>
                    <Text style={tw`text-xl text-black font-medium ml-1`}>Filter by Price</Text>
                    <View style={tw`w-full flex-row flex-wrap`}>
                        {data_attributes.max_price &&
                            divPriceToArray(data_attributes.max_price).map((item, index): any => {
                                return (
                                    // <View
                                    //     style={tw`flex flex-row items-center`}
                                    //     key={index}
                                    // >
                                    //     <CheckBox
                                    //         id={`trademark-${index}`}
                                    //         value={isSelected}
                                    //         onValueChange={setSelection}
                                    //         boxType="square"
                                    //         style={tw`mr-2`}
                                    //     />
                                    //     <Text>{item.text}</Text>
                                    // </View>
                                    <View
                                        key={index}
                                        style={tw`w-1/2`}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                onSelectAttributeHandler("price", "price", item.data)
                                            }}
                                            style={tw`bg-[#17a2b830] p-2.5 rounded-md m-1`}
                                        >
                                            <Text style={tw`text-base text-black text-center`}>{item.text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={tw`mt-3`}>
                    <Text style={tw`text-xl text-black font-medium ml-1`}>Filter by Trademark</Text>
                    <View style={tw`w-full flex-row flex-wrap`}>
                        {data_attributes.trademarks &&
                            data_attributes.trademarks.map((item: any, index: any) => {
                                return (
                                    <View
                                        key={index}
                                        style={tw`w-1/2`}
                                    >
                                        <TouchableOpacity
                                            onPress={() => { onSelectAttributeHandler("trademark", "trademark", item); }}
                                            style={tw`bg-[#17a2b830] p-2.5 rounded-md m-1`}
                                        >
                                            <Text style={tw`text-base text-black text-center`}>{item}</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                    </View>
                </View>
                <View>
                    {data_attributes.attributes &&
                        data_attributes.attributes.map((item: any, index: any) => {
                            return (
                                <View
                                    style={tw`mt-3`}
                                    key={index}
                                >
                                    <Text style={tw`text-xl text-black font-medium ml-1`}>{`Filter by ${Object.keys(item)[0]}`}</Text>
                                    <View style={tw`w-full flex-row flex-wrap`}>
                                        {item[Object.keys(item)[0]].data.map((attItem: any, attIndex: any) => {
                                            return (
                                                <View
                                                    key={attIndex}
                                                    style={tw`w-1/2`}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            onSelectAttributeHandler(
                                                                item[Object.keys(item)[0]].id,
                                                                Object.keys(item)[0],
                                                                attItem
                                                            );
                                                        }}
                                                        style={tw`bg-[#17a2b830] p-2.5 rounded-md m-1`}
                                                    >
                                                        <Text style={tw`text-base text-black text-center`}>{`${attItem} ${item[Object.keys(item)[0]].unit}`}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            );
                        })}
                </View>
                <View style={tw`h-5`}></View>
            </ScrollView>
            <View style={tw`flex flex-row items-center bg-slate-50 p-3`}>
                <TouchableOpacity
                    style={tw`flex-1 py-3 border border-[${COLOR.PRIMARY}] rounded mr-1`}
                >
                    <Text style={tw`text-base text-[${COLOR.PRIMARY}] font-medium text-center`}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`flex-1 py-3 bg-[${COLOR.PRIMARY}] rounded ml-1`}
                >
                    <Text style={tw`text-base text-[${COLOR.WHITE}] font-medium text-center`}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}