import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'

export default function CategoriesModal({ visible, handleVisible }: any) {
    return (
        <Modal
            visible={visible}
            animationType={'slide'}
            transparent={false}
        >
            <TouchableOpacity
                onPress={handleVisible}
            >
                <Text>Back</Text>
            </TouchableOpacity>
            <Text>hello</Text>
        </Modal>
    )
}