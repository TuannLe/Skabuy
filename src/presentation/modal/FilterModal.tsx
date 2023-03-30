import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from "react-redux";
import CheckBox from '@react-native-community/checkbox';
import { ROUTER, COLOR } from '../constants'
import { divPriceToArray } from '../../util/helper'

export default function FilterModal({ visible, handleVisible }: any) {
    const navigation = useNavigation()
    const attributes = useSelector((state: any) => state.product.attributes)
    const [isSelected, setSelection] = useState(false);
    console.log(attributes)
    return (
        <Modal
            visible={visible}
            animationType={'slide'}
            transparent={false}
        >
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-3 pr-8 `}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="ios-close-outline" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>Filter</Text>
            </View>
            <View>
                <View>
                    <Text>Filter by Price</Text>
                    {attributes.max_price &&
                        divPriceToArray(attributes.max_price).map((item, index) => {
                            return (
                                <CheckBox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                    boxType="square"
                                    style={tw`mr-5`}
                                />
                            )
                        })
                    }
                </View>
            </View>
        </Modal>
    )
}