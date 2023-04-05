import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ROUTER, COLOR } from '../constants'
import { formatNumber } from '../../util/helper';

export default function ItemReviews({ item }: any) {
    const navigation = useNavigation();
    const WIDTH = Dimensions.get('window').width;

    console.log(item)

    return (
        <View style={tw`flex-row`}>
            <View style={tw`p-2`}>  
                <Image
                    source={{ uri: "https://skabuy.com/static/media/product1.78d63a8ff4e344b53377.jpg" }}
                    style={tw`w-15 h-15`}
                    resizeMode={'contain'}
                />
            </View>
            <View style={tw`p-2`}>
                <Text style={tw`font-bold`}>Admin - 20/12/2022</Text>
                <View style={tw`flex flex-row items-center`}>
                    <Ionicons name='star-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                    <Ionicons name='star-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                    <Ionicons name='star-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                    <Ionicons name='star-half-sharp' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                    <Ionicons name='star-outline' style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                </View>
                <Text>{item.comment_content}</Text>
            </View>
        </View>
    )
}