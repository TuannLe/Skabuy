import { View, Dimensions } from 'react-native'
import React from 'react'
import Skeleton from './Skeleton'
import tw from 'twrnc'

export default function SkeletonItemProduct() {
    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    return (
        <View style={tw`w-full flex flex-row justify-between px-1`}>
            <View style={tw`overflow-hidden flex bg-gray-200 p-2 w-[${(SCREEN_WIDTH - 30) / 3}px] h-50 rounded`}>
                <Skeleton w={(SCREEN_WIDTH - 30) / 3 - 15} h={130} rounded={1} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={(SCREEN_WIDTH - 30) / 3 - 25} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
                <View style={tw`mt-2`}>
                    <Skeleton w={(SCREEN_WIDTH - 30) / 3 - 55} h={15} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`overflow-hidden flex bg-gray-200 p-2 w-[${(SCREEN_WIDTH - 30) / 3}px] h-50 rounded`}>
                <Skeleton w={(SCREEN_WIDTH - 30) / 3 - 15} h={130} rounded={1} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={(SCREEN_WIDTH - 30) / 3 - 25} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
                <View style={tw`mt-2`}>
                    <Skeleton w={(SCREEN_WIDTH - 30) / 3 - 55} h={15} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`overflow-hidden flex bg-gray-200 p-2 w-[${(SCREEN_WIDTH - 30) / 3}px] h-50 rounded`}>
                <Skeleton w={(SCREEN_WIDTH - 30) / 3 - 15} h={130} rounded={1} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={(SCREEN_WIDTH - 30) / 3 - 25} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
                <View style={tw`mt-2`}>
                    <Skeleton w={(SCREEN_WIDTH - 30) / 3 - 55} h={15} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
        </View>
    )
}