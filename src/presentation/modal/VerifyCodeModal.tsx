import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { COLOR } from '../constants'

export default function VerifyCodeModal({ handleVisible, isVisible }: any) {
    const WIDTH = Dimensions.get('window').width;
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
        >
            <View style={[tw`w-full h-full flex justify-center items-center`, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <View style={tw`w-${WIDTH - 40}px h-100 bg-white px-5 rounded`}>
                    <Text style={tw`text-2xl font-medium text-black text-center mt-5`}>Didn't receive email code?</Text>
                    <Text style={tw`text-base my-3.5`}>Code sent to your email. If you have not received the code after several attempts, please try:</Text>
                    <Text style={tw`text-base`}>1. Check if it is in your junk/spam mail.</Text>
                    <Text style={tw`text-base`}>2. The message may be delayed for a few minutes. Try again after 20 minutes.</Text>
                    <Text style={tw`text-base`}>3. If this email address already exists, we will not send you an authentication code. Please login or reset your password.</Text>
                    <TouchableOpacity
                        onPress={handleVisible}
                        style={tw`bg-[${COLOR.PRIMARY}] py-3 rounded mt-5`}
                    >
                        <Text style={tw`text-white text-center text-lg font-medium`}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}