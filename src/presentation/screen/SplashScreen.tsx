import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Lottie from 'lottie-react-native';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import { ROUTER } from '../constants';

export default function SplashScreen() {
    const navigation = useNavigation()

    return (
        <View style={tw`w-full h-full bg-pink-400`}>
            <Lottie
                source={require('../../assets/animation/140468-bound-loading.json')}
                autoPlay
                loop={false}
                onAnimationFinish={() => navigation.navigate('Root')}
            />
        </View>
    )
}