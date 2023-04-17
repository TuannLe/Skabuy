import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Skeleton from './Skeleton'
import tw from 'twrnc'

export default function SkeletonCategories() {
    const { width: SCREEN_WIDTH } = Dimensions.get('window');
    return (
        <View style={tw`w-full flex-row flex-wrap mt-2 p-3 justify-between bg-white`}>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
            <View style={tw`w-1/3 items-center mt-3`}>
                <Skeleton w={95} h={95} rounded={100} bg={'#ccc'} twrnc={'bg-gray-100'} />
                <View style={tw`mt-2`}>
                    <Skeleton w={95} h={20} rounded={2} bg={'#ccc'} twrnc={'bg-gray-100'} />
                </View>
            </View>
        </View>
    )
}