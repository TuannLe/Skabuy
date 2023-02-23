import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import FavoriteScreen from '../screen/FavoriteScreen';
import ProfileScreen from '../screen/ProfileScreen';

export default function ToolBar() {
    return (
        <View style={tw`bg-black`}>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
        </View>
    )
}