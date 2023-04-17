import { View, Dimensions } from 'react-native'
import React from 'react'
import Skeleton from './Skeleton'
import tw from 'twrnc'

export default function SkeletonProductDetail() {
    const { width: SCREEN_WIDTH } = Dimensions.get('window');
    return (
        <View style={tw`w-full p-2 bg-white`}>
            <Skeleton w={120} h={25} rounded={1} bg={'#ccc'} twrnc={'bg-gray-100'} />
            <View style={tw`mt-2`}>
                <Skeleton w={280} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
            </View>
            <View style={tw`mt-2`}>
                <Skeleton w={380} h={25} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
            </View>
            <View style={tw`mt-2`}>
                <Skeleton w={120} h={25} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
            </View>
            <View style={tw`mt-2 flex flex-row items-center`}>
                <Skeleton w={160} h={45} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`w-3`}></View>
                <Skeleton w={120} h={35} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
            </View>
            <View style={tw`mt-2`}>
                <Skeleton w={120} h={25} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
            </View>
            <View style={tw`mt-2 flex flex-row items-center justify-between`}>
                <Skeleton w={SCREEN_WIDTH / 2 - 20} h={45} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <Skeleton w={SCREEN_WIDTH / 2 - 20} h={45} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
            </View>
            <View style={tw`mt-2 flex flex-row items-center`}>
                <Skeleton w={130} h={40} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`w-3`}></View>
                <Skeleton w={130} h={40} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
            </View>
        </View>
    )
}