import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../core/api/authAPI'
import * as ACTIONS from '../../core/redux/actions/auth'
import { ROUTER, COLOR } from '../constants'

export default function LoginScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [payload, setPayload] = useState({
        user_email: "",
        password: "",
    });
    const [loginWarn, setLoginWarn] = useState('');
    const [color, setColor] = useState('');

    const onLoginHandler = async () => {
        if (!payload.user_email) {
            setColor('red')
            setLoginWarn(`Please enter your email`)
        }
        else if (!payload.password) {
            setColor('red')
            setLoginWarn(`Please enter your password`)
        } else {
            const response = await login(payload);
            if (
                response.message === "Invalid account" ||
                response.message === "Incorrect password"
            ) {
                setLoginWarn(response.message);
            } else {
                switch (response.data.status) {
                    case 0:
                        dispatch(ACTIONS.LoginSuccess({ token: JSON.stringify(response.token), data: response.data }));
                        setColor('green')
                        setLoginWarn("Login successful");
                        navigation.navigate(ROUTER.HOME_TAB)
                        break;
                    case 1:
                        setColor('red')
                        setLoginWarn("Your account is banded");
                        break;
                    case 2:
                        dispatch(ACTIONS.LoginSuccess({ token: JSON.stringify(response.token), data: response.data }));
                        navigation.navigate(ROUTER.VERIFY_CODE_SCREEN, { email: payload.user_email });
                        break;
                    default:
                        break;
                }
            }
        }
    }

    return (
        <View style={tw`flex w-full h-full pt-16 bg-white px-5`}>
            <Text style={tw`text-4xl font-medium text-black`}>Welcome to</Text>
            <Text style={tw`text-5xl font-medium text-[${COLOR.PRIMARY}]`}>Skabuy</Text>
            <Text style={tw`text-xl text-black mt-2 mb-24`}>Sign in to your account!</Text>
            <TextInput
                placeholder='Enter email...'
                onChangeText={val => {
                    setPayload((current) => ({
                        ...current,
                        user_email: val,
                    }))
                }
                }
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg`}
            />
            <TextInput
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg mt-3`}
                secureTextEntry={true}
                placeholder='Enter password...'
                onChangeText={val => {
                    setPayload((current) => ({
                        ...current,
                        password: val,
                    }))
                }}
            />
            <TouchableOpacity
                style={tw`py-1 mt-2`}
            >
                <Text style={tw`text-base text-gray-500`}>Forgot your password?</Text>
            </TouchableOpacity>
            <Text style={tw`text-${color}-600 text-base mb-5`}>{loginWarn}</Text>
            <TouchableOpacity
                onPress={() => onLoginHandler()}
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