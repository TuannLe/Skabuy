import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'

export default function ButtonGroup({ buttons, doSomethingAfterClick }: any) {
    const [clickedId, setClickedId] = useState(0)
    console.log(buttons)
    const handleClick = (item: any, id: any) => {
        setClickedId(id)
    }

    return (
        <View style={tw`w-full flex-row flex-wrap`}>
            {buttons.map((option: any, index: any) => {
                return (
                    <View style={tw`w-1/2 p-1`}>
                        <TouchableOpacity
                            onPress={(item) => handleClick(item, index)}
                            key={index}
                            style={[
                                index === clickedId ? styles.buttonActive : styles.button,
                            ]}
                        >
                            <Text style={[
                                index === clickedId ? styles.textActive : styles.text,
                            ]}>{option.values}</Text>
                        </TouchableOpacity>
                    </View>
                );
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 10,
        marginRight: 2,
        marginLeft: 2
    },
    buttonActive: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#17a2b8ad',
        borderWidth: 2,
        borderColor: '#17a2b8ad',
        borderRadius: 10,
        marginRight: 2,
        marginLeft: 2,
        color: 'white'
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600'
    },
    textActive: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600'
    }
})