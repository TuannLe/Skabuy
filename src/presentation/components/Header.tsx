import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { ROUTER, COLOR } from '../constants'

export default function Header() {
    const [showBar, setShowBar] = useState(false)
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState('java');

    return (
        <View style={tw`flex flex-row items-center bg-[${COLOR.PRIMARY}] `}>
            <View style={tw`flex flex-1 justify-center items-center`}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={tw`p-2 `}
                >
                    <Ionicons name='menu-outline' size={50} style={tw`text-white`} />
                </TouchableOpacity>
            </View>
            {/* <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue: any, itemIndex: any) => setSelectedValue(itemValue)}
            // style={styles.picker}
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="javascript" />
                <Picker.Item label="Python" value="python" />
                <Picker.Item label="Ruby" value="ruby" />
            </Picker> */}
            <View style={tw`w-76 flex flex-row items-center rounded-full bg-white px-3 `}>
                <TextInput
                    placeholder='Search...'
                    style={tw`flex-1 text-base`}
                />
                <TouchableOpacity>
                    <Ionicons name='search' style={tw`text-xl text-gray-400`} />
                </TouchableOpacity>
            </View>
            <View style={tw`flex flex-1 justify-center items-center`}>

                <TouchableOpacity
                    style={tw`p-2`}
                    onPress={() => navigation.navigate(ROUTER.CART_TAB)}
                >
                    <Feather name='shopping-cart' style={tw`text-4xl text-white`} />
                </TouchableOpacity>
            </View>
        </View>
    )
}