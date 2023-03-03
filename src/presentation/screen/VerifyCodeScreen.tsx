import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../constants'

export default function VerifyCodeScreen({ route: { params: { user_email } }, navigation }: any) {
    const firstInput = useRef(null)
    const secondInput = useRef(null)
    const thirdInput = useRef(null)
    const fourthInput = useRef(null)
    const fifthInput = useRef(null)
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '' })

    const handleSendOTP = () => {
        console.log(otp)
    }

    useEffect(() => {
        let interval: any = null;

        if (resendTimer > 0 && !isResendEnabled) {
            interval = setInterval(() => {
                setResendTimer(resendTimer => resendTimer - 1);
            }, 1000);
        }

        if (resendTimer === 0 && !isResendEnabled) {
            setIsResendEnabled(true);
        }

        return () => clearInterval(interval);
    }, [isResendEnabled, resendTimer]);

    const handleResendClick = () => {
        setIsResendEnabled(false);
        setResendTimer(30);

        // TODO: Make the request to resend the code here
    };

    return (
        <View style={tw`flex w-full h-full px-3`}>
            <View style={tw`flex flex-row items-center justify-center h-15`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw`absolute left-0 top-0 p-3`}
                >
                    <Ionicons name='chevron-back' style={tw`text-black text-3xl`} />
                </TouchableOpacity>
                <Text style={tw`text-xl font-medium text-black`}>OTP Verification</Text>
            </View>
            <Text style={tw`text-2xl font-medium text-black mt-5`}>Verification</Text>
            <Text style={tw`text-base text-gray-500 my-5`}>Enter the OTP Code from the email just send your at {user_email}</Text>
            <Text style={tw`text-base text-black`}>Did you enter the correct number?</Text>
            <View style={tw`flex flex-row justify-evenly my-8`}>
                <View style={tw`border border-[${COLOR.PRIMARY}] rounded-lg`}>
                    <TextInput
                        keyboardType='number-pad'
                        maxLength={1}
                        ref={firstInput}
                        onChangeText={text => {
                            setOtp({ ...otp, 1: text })
                            text && secondInput.current.focus()
                        }}
                        style={tw`p-3 text-center`}
                    />
                </View>
                <View style={tw`border border-[${COLOR.PRIMARY}] rounded-lg`}>
                    <TextInput
                        keyboardType='number-pad'
                        maxLength={1}
                        ref={secondInput}
                        onChangeText={text => {
                            setOtp({ ...otp, 2: text })
                            text ? thirdInput.current.focus() : firstInput.current.focus()
                        }}
                        style={tw`p-3 text-center`}
                    />
                </View>
                <View style={tw`border border-[${COLOR.PRIMARY}] rounded-lg`}>
                    <TextInput
                        keyboardType='number-pad'
                        maxLength={1}
                        ref={thirdInput}
                        onChangeText={text => {
                            setOtp({ ...otp, 3: text })
                            text ? fourthInput.current.focus() : secondInput.current.focus()
                        }}
                        style={tw`p-3 text-center`}
                    />
                </View>
                <View style={tw`border border-[${COLOR.PRIMARY}] rounded-lg`}>
                    <TextInput
                        keyboardType='number-pad'
                        maxLength={1}
                        ref={fourthInput}
                        onChangeText={text => {
                            setOtp({ ...otp, 4: text })
                            text ? fifthInput.current.focus() : thirdInput.current.focus()
                        }}
                        style={tw`p-3 text-center`}
                    />
                </View>
                <View style={tw`border border-[${COLOR.PRIMARY}] rounded-lg`}>
                    <TextInput
                        keyboardType='number-pad'
                        maxLength={1}
                        ref={fifthInput}
                        onChangeText={text => {
                            setOtp({ ...otp, 5: text })
                            !text && fourthInput.current.focus();
                        }}
                        style={tw`p-3 text-center`}
                    />
                </View>
            </View>
            <View style={tw`flex flex-row items-center mb-5`}>
                <Text style={tw`text-base`}>Didn't receive email?</Text>
                {isResendEnabled ?
                    <TouchableOpacity
                        style={tw`p-1.5`}
                        onPress={handleResendClick}
                        disabled={!isResendEnabled}
                    >
                        <Text style={tw`text-base text-[${COLOR.PRIMARY}] font-medium`}>Resend Code</Text>
                    </TouchableOpacity>
                    :
                    <Text style={tw`text-base p-1.5 text-black`}>{`Resend code in ${resendTimer} seconds`}</Text>
                }
            </View>
            <TouchableOpacity
                onPress={() => {
                    handleSendOTP();
                }}
                style={tw`p-3 bg-[${COLOR.PRIMARY}] rounded-lg`}
            >
                <Text style={tw`text-center text-white text-xl font-medium`}>VERIFY</Text>
            </TouchableOpacity>
        </View>
    )
}