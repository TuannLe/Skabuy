import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../core/api/authAPI'
import { ROUTER, COLOR } from '../constants'
import { validatePassword, validateEmail } from '../../util/helper'

export default function RegisterScreen({ navigation }: any) {
    const [registerInfo, setRegisterInfo] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullname: "",
    });

    const [registerWarn, setRegisterWarn] = useState('')
    const [color, setColor] = useState('red-500')

    const handleRegister = async () => {
        if (!registerInfo.fullname) {
            setRegisterWarn(`Please enter your name`)
        }
        else if (!registerInfo.email) {
            setRegisterWarn(`Please enter your email`)
        } else if (!validateEmail(registerInfo.email)) {
            setRegisterWarn(`Email not valid`)
        }
        else if (!validatePassword(registerInfo.password) || !validatePassword(registerInfo.confirmPassword)) {
            setRegisterWarn(`Passwords must have at least 8 characters and contain: uppercase letters, lowercase letters, numbers and symbols`)
        }
        else if (!registerInfo.confirmPassword || !registerInfo.password) {
            setRegisterWarn(`Please enter your password`)
        }
        else if (registerInfo.confirmPassword != registerInfo.password) {
            setRegisterWarn(`Confirm password doesn't match`)
        }
        else {
            setRegisterWarn(``)
            const response = await register(registerInfo)
            if (response.status == "success") {
                setRegisterWarn("Register successfully!");
                setColor('green-500')
                navigation.navigate(ROUTER.LOGIN)
            } else {
                setRegisterWarn(response.message);
                setColor('red-500')
            }
        }
    }

    return (
        <View style={tw`flex w-full h-full bg-white pt-16 px-5`}>
            <Text style={tw`text-4xl font-medium text-[${COLOR.PRIMARY}] mb-10`}>Create account</Text>
            <TextInput
                placeholder='Email...'
                onChangeText={val =>
                    setRegisterInfo((current) => ({
                        ...current,
                        email: val
                    }))
                }
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg`}
            />
            <TextInput
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg my-3`}
                secureTextEntry={true}
                onChangeText={val =>
                    setRegisterInfo((current) => ({
                        ...current,
                        password: val
                    }))
                }
                placeholder='Password... (Example@123)'
            />
            <TextInput
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg`}
                secureTextEntry={true}
                onChangeText={val =>
                    setRegisterInfo((current) => ({
                        ...current,
                        confirmPassword: val
                    }))
                }
                placeholder='Confirm password...'
            />
            <TextInput
                placeholder='Full name...'
                onChangeText={val =>
                    setRegisterInfo((current) => ({
                        ...current,
                        fullname: val
                    }))
                }
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg my-3`}
            />
            {registerWarn ? (
                <Text style={tw`text-${color} text-sm mt-2`}>{registerWarn}</Text>
            ) : (
                <></>
            )}
            <TouchableOpacity
                onPress={() => {
                    handleRegister();
                }}
                style={tw`p-3 bg-[${COLOR.PRIMARY}] rounded-lg mt-8`}
            >
                <Text style={tw`text-center text-white text-xl font-medium`}>REGISTER</Text>
            </TouchableOpacity>
            <View style={tw`flex flex-row items-center justify-center mb-5`}>
                <Text style={tw`text-base`}>Already have an account?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTER.LOGIN)}
                    style={tw`p-1.5`}
                >
                    <Text style={tw`text-base text-[${COLOR.PRIMARY}] font-medium`}>Login here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}