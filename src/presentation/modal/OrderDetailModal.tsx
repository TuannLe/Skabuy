import { View, Text, Modal } from 'react-native'
import React from 'react'
import tw from 'twrnc'

export default function OrderDetailModal({ isVisible }: any) {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
        >
            <Text>Ordered items - order_1c745c8e-82c0-4951-8457-2efbc3687250</Text>
            <View>
                <View>
                    <Text>To:</Text>
                    <Text>Admin</Text>
                </View>
            </View>
        </Modal>
    )
}