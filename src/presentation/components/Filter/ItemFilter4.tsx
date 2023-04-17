import { View, Text } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { CheckBox } from '@rneui/themed';

export default function ItemFilter4({ item, onSelectPriceHandler }: any) {
    const [checked, setChecked] = useState(false);

    const toggleCheckbox = () => {
        setChecked(!checked)
        onSelectPriceHandler(item.data)
    }
    return (
        <View style={tw`-ml-2 flex flex-row items-center`}>
            <CheckBox
                checked={checked}
                onPress={toggleCheckbox}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor="green"
                size={30}
                style={tw`bg-pink-300`}
            />
            <Text numberOfLines={1} style={tw`text-base -ml-2 text-black font-medium`}>{item.text}</Text>
        </View>
    )
}