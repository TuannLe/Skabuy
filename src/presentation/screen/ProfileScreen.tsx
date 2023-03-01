import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';

import { ROUTER } from '../constants'

export default function ProfileScreen() {
    const navigation = useNavigation();
    const image_banner = [
        'https://skabuy.com/banners/banner_1.jpg',
        'https://skabuy.com/banners/banner_2.jpg',
        'https://skabuy.com/banners/banner_3.jpg'
    ]
    return (
        <View style={tw`w-full h-full`}>
            <TouchableOpacity
                onPress={() => navigation.navigate(ROUTER.LOGIN)}
                style={tw`p-3 bg-red-500 mb-10`}
            >
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}