import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ROUTER, COLOR } from '../constants'
import { formatNumber, formatdate } from '../../util/helper';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function ItemReviews({ item }: any) {
    function star() {
        var myloop = [];

        for (let i = 0; i < 5; i++) {
            myloop.push(
                <View key={i}>
                    <FontAwesome name={`${i < item.comment_star ? "star" : "star-o"}`} style={tw`text-2xl text-[${COLOR.PRIMARY}]`} />
                </View>
            );
        }

        return (
            <View style={tw`flex-row`}>
                {myloop}
            </View>
        );
    }

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
                <View style={tw`flex-row`}>
                    <Text style={tw`text-base text-black font-medium`}>{item.user_fullname} -</Text>
                    <Text style={tw`text-base italic`}> {formatdate(item.created_at)}</Text>
                </View>
                <View style={tw`flex flex-row items-center`}>
                    {star()}
                </View>
                <Text style={tw`text-base`}>{item.comment_content}</Text>
            </View>
        </View>
    )
}