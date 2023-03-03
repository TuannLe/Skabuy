import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import ItemMovie from '../components/ItemMovie';

import { ROUTER } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const image_banner = [
        'https://skabuy.com/banners/banner_1.jpg',
        'https://skabuy.com/banners/banner_2.jpg',
        'https://skabuy.com/banners/banner_3.jpg'
    ]
    const data = [
        {
            "name": "Banner"
        },
        {
            "name": "Banner"
        },
        {
            "name": "Banner"
        },
    ]
    return (
        <SafeAreaView style={tw`w-full h-full`}>
            <TouchableOpacity
                onPress={() => navigation.navigate(ROUTER.LOGIN)}
                style={tw`p-3 bg-red-500 mb-10`}
            >
                <Text>Login</Text>
            </TouchableOpacity>
            <FlatList
                data={data}
                renderItem={({ item }) => <Text>Hello</Text>}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}