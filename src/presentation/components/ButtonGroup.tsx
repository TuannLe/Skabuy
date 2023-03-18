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
        <View style={styles.container}>
            {buttons.map((option: any, index: any) => {
                return (
                    <TouchableOpacity
                        onPress={(item) => handleClick(item, index)}
                        key={index}
                        style={[
                            index === clickedId ? styles.buttonActive : styles.button,
                        ]}
                    >
                        <Text style={styles.text}>{option.values}</Text>
                    </TouchableOpacity>
                );
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: .5,
        borderColor: 'black',
        borderRadius: 10,
        marginRight: 2,
        marginLeft: 2
    },
    buttonActive: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#17a2b8',
        borderRadius: 10,
        marginRight: 2,
        marginLeft: 2
    },
    text: {
        fontSize: 14,
        color: 'black',
        fontWeight: '400'
    }
})