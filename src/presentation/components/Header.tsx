import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

export default function Header() {
    const [showBar, setShowBar] = useState(false)
    const navigation = useNavigation();
    return (
        <View style={tw`flex flex-row items-center bg-[#17a2b8] p-3`}>
            <Text>Logo</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Category')}
                style={tw`text-xl text-black ml-3`}
            >
                <Ionicons name='menu-outline' style={tw`text-3xl text-black`} />
            </TouchableOpacity>
            <View style={tw`flex flex-row flex-1 items-center rounded-full bg-white px-3 mx-3`}>
                <TextInput
                    placeholder='Search...'
                    style={tw`flex-1 text-base`}
                />
                <Ionicons name='search' style={tw`text-xl text-black`} />
            </View>
            <TouchableOpacity>
                <Feather name='shopping-cart' style={tw`text-xl text-black`} />
            </TouchableOpacity>
        </View>
    )
}