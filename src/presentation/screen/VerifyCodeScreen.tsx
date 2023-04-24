import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import tw from 'twrnc'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount, generatePin } from '../../core/api/authAPI'
import { ROUTER, COLOR } from '../constants'
import VerifyCodeModal from '../modal/VerifyCodeModal';

export default function VerifyCodeScreen({ route: { params: { email } }, navigation }: any) {
    const firstInput = useRef(null)
    const secondInput = useRef(null)
    const thirdInput = useRef(null)
    const fourthInput = useRef(null)
    const fifthInput = useRef(null)
    const sixthInput = useRef(null)
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' })
    const [payload, setPayload] = useState({
        user_email: email,
        pin: '',
    })
    const [warn, setWarn] = useState('')
    const [visible, setVisible] = useState(false)
    const currentUser = useSelector((state: any) => state.auth.currentUser)

    useEffect(() => {
        setPayload((current) => ({
            ...current,
            pin: `${otp[1]}${otp[2]}${otp[3]}${otp[4]}${otp[5]}${otp[6]}`,
        }))
    }, [otp])

    const handleGeneratePin = async () => {
        await generatePin({ user_email: email });
    }

    useEffect(() => {
        handleGeneratePin()
    }, [])

    const handleVerifyAccount = async () => {
        const response = await verifyAccount(payload)
        if (response.status == "success") {
            if (response.data.affectedRows != 0) {
                currentUser.status = 0
                navigation.navigate(ROUTER.HOME_TAB);
            }
        } else {
            setWarn(response.message);
        }
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
        handleGeneratePin()
        setIsResendEnabled(false);
        setResendTimer(30);
    };
    const handleSetVisible = () => {
        setVisible(!visible);
    }

    return (
        <View style={tw`flex w-full h-full`}>
            <View style={tw`flex flex-row items-center justify-center h-15`}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw`absolute left-0 top-0 pl-1 pr-5 py-3`}
                >
                    <Ionicons name='chevron-back' style={tw`text-black text-3xl`} />
                </TouchableOpacity>
                <Text style={tw`text-xl font-medium text-black`}>OTP Verification</Text>
            </View>
            <View style={tw`px-3`}>
                <Text style={tw`text-2xl font-medium text-black mt-5`}>Verification</Text>
                <Text style={tw`text-base text-gray-500 my-5`}>Enter the OTP Code from the email just send your at {email}</Text>
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
                            style={tw`p-3 text-base text-center`}
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
                            style={tw`p-3 text-base text-center`}
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
                            style={tw`p-3 text-base text-center`}
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
                            style={tw`p-3 text-base text-center`}
                        />
                    </View>
                    <View style={tw`border border-[${COLOR.PRIMARY}] rounded-lg`}>
                        <TextInput
                            keyboardType='number-pad'
                            maxLength={1}
                            ref={fifthInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 5: text })
                                text ? sixthInput.current.focus() : fourthInput.current.focus()
                            }}
                            style={tw`p-3 text-base text-center`}
                        />
                    </View>
                    <View style={tw`border border-[${COLOR.PRIMARY}] rounded-lg`}>
                        <TextInput
                            keyboardType='number-pad'
                            maxLength={1}
                            ref={sixthInput}
                            onChangeText={text => {
                                setOtp({ ...otp, 6: text })
                                !text && fifthInput.current.focus();
                            }}
                            style={tw`p-3 text-base text-center`}
                        />
                    </View>
                </View>
                <View>
                    {warn ? (
                        <Text style={tw`text-red-500 text-base`}>{warn}</Text>
                    ) : null}
                </View>
                <View style={tw`flex flex-row items-center mb-5`}>
                    <TouchableOpacity
                        onPress={handleSetVisible}
                    >
                        <Text style={tw`text-base`}>Didn't receive email?</Text>
                    </TouchableOpacity>
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
                        handleVerifyAccount();
                    }}
                    style={tw`p-3 bg-[${COLOR.PRIMARY}] rounded-lg`}
                >
                    <Text style={tw`text-center text-white text-xl font-medium`}>VERIFY</Text>
                </TouchableOpacity>
            </View>

            <VerifyCodeModal
                isVisible={visible}
                handleVisible={handleSetVisible}
            />
        </View>
    )
}