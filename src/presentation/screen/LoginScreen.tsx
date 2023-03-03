import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import * as ACTIONS from '../../core/redux/actions/auth'
import { ROUTER, COLOR } from '../constants'

export default function LoginScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [user_email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginWarn, setLoginWarn] = useState('');

    const handleLogin = () => {
        if (!user_email) {
            setLoginWarn(`Please enter your email`)
        }
        else if (!password) {
            setLoginWarn(`Please enter your password`)
        } else {
            dispatch(ACTIONS.LoginStart({ user_email, password }))
        }
    }

    return (
        <View style={tw`flex w-full h-full pt-16 bg-white px-5`}>
            <Text style={tw`text-4xl font-medium text-black`}>Welcome to</Text>
            <Text style={tw`text-5xl font-medium text-[${COLOR.PRIMARY}]`}>Skabuy</Text>
            <Text style={tw`text-xl text-black mt-2 mb-24`}>Sign in to your account!</Text>
            <TextInput
                placeholder='Enter email...'
                onChangeText={val => setUserEmail(val)}
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg`}
            />
            <TextInput
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg mt-3`}
                secureTextEntry={true}
                placeholder='Enter password...'
                onChangeText={val => setPassword(val)}
            />
            <TouchableOpacity
                style={tw`p-1 mt-2 mb-5`}
            >
                <Text style={tw`text-base text-gray-500`}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleLogin()}
                style={tw`p-3 bg-[${COLOR.PRIMARY}] rounded-lg`}
            >
                <Text style={tw`text-center text-white text-xl font-medium`}>LOGIN</Text>
            </TouchableOpacity>
            <View style={tw`flex flex-row items-center justify-center`}>
                <Text style={tw`text-base`}>Don't have an account? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTER.REGISTER)}
                    style={tw`p-1.5`}
                >
                    <Text style={tw`text-base text-[${COLOR.PRIMARY}] font-medium`}>Register here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}