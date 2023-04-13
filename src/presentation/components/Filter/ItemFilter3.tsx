import { View, Text } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { CheckBox } from '@rneui/themed';

export default function ItemFilter3({ item, attItem, onSelectAttributeHandler }: any) {
    const [checked, setChecked] = useState(false);

    const toggleCheckbox = () => {
        setChecked(!checked)
        onSelectAttributeHandler(item[Object.keys(item)[0]].id,
            Object.keys(item)[0],
            attItem)
    }
    return (
        <View style={tw`-ml-2 flex-row items-center`}>
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
            <Text numberOfLines={1} style={tw`text-base -ml-2 text-black font-medium`}>{`${attItem} ${item[Object.keys(item)[0]].unit}`}</Text>
        </View>
    )
}