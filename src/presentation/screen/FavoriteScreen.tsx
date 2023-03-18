import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'

export default function FavoriteScreen() {
    const [number, onChangeNumber] = useState(0);
    return (
        <View>
            <Text>FavoriteScreen</Text>
        </View>
    )
}