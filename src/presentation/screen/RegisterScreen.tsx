import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux'
import Mailer from 'react-native-mail';
import * as ACTIONS from '../../core/redux/actions/auth'
import { ROUTER, COLOR } from '../constants'

export default function RegisterScreen({ navigation }: any) {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const [showPicker, setShowPicker] = useState(false);
    const [selectedGender, setSelectedGender] = useState();

    const [user_email, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cfPassword, setCfPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [registerWarn, setRegisterWarn] = useState('')

    const onDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDateTimePicker = () => {
        setShowPicker(true);
    };

    const validatePassword = (password: string) => {
        return passwordRegex.test(password);
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmail = (email: string) => {
        return emailRegex.test(email);
    };

    // const sendOTPByEmail = (email: any) => {
    //     const otp = Math.floor(100000 + Math.random() * 900000);
    //     const emailBody = `Your OTP is ${otp}.`;

    //     try {
    //         await Mailer.mail({
    //             recipients: [email],
    //             subject: 'OTP Verification',
    //             body: emailBody,
    //         });
    //         return otp;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleSendOTPClick = () => {
        const otp = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

        // Define the email message
        const message = {
            subject: 'Your OTP code',
            body: `Your OTP code is ${otp}. Please enter this code to continue.`,
        };

        console.log(message)
        console.log(otp)
        // Send the email
        Mailer.mail(
            {
                subject: message.subject,
                body: message.body,
                recipients: [user_email],
            },
            error => {
                if (error) {
                    console.log('Error', 'Failed to send OTP code. Please try again later.');
                } else {
                    console.log('Success', 'OTP code sent successfully. Please check your email.');
                }
            },
        );
    };

    const handleRegister = () => {
        if (!fullName) {
            setRegisterWarn(`Please enter your name`)
        }
        else if (!user_email) {
            setRegisterWarn(`Please enter your email`)
        } else if (!validateEmail(user_email)) {
            setRegisterWarn(`Email not valid`)
        }
        else if (!phoneNumber) {
            setRegisterWarn(`Please enter your phone number`)
        } else if (!(phoneNumber.length === 10)) {
            setRegisterWarn(`Phone number not valid`)
        }
        else if (!validatePassword(password) || !validatePassword(cfPassword)) {
            setRegisterWarn(`Passwords must have at least 8 characters and contain: uppercase letters, lowercase letters, numbers and symbols`)
        }
        else if (!cfPassword || !password) {
            setRegisterWarn(`Please enter your password`)
        }
        else if (cfPassword != password) {
            setRegisterWarn(`Confirm password doesn't match`)
        }
        else {
            setRegisterWarn(``)
            dispatch(ACTIONS.RegisterStart({ user_email, phoneNumber, fullName, password }))
        }
    }

    return (
        <View style={tw`flex w-full h-full bg-white pt-16 px-5`}>
            <Text style={tw`text-4xl font-medium text-[${COLOR.PRIMARY}] mb-10`}>Create account</Text>
            <TextInput
                placeholder='Email...'
                onChangeText={val => setUserEmail(val)}
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg`}
            />
            <TextInput
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg my-3`}
                secureTextEntry={true}
                onChangeText={val => setPassword(val)}
                placeholder='Password... (Example@123)'
            />
            <TextInput
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg`}
                secureTextEntry={true}
                onChangeText={val => setCfPassword(val)}
                placeholder='Confirm password...'
            />
            <TextInput
                placeholder='Full name...'
                onChangeText={val => setFullName(val)}
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg my-3`}
            />
            <TextInput
                inputMode="numeric"
                onChangeText={val => setPhoneNumber(val)}
                placeholder='Phone number...'
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg`}
            />
            {/* <View style={tw`my-3`}>
                <TouchableOpacity
                    style={tw`bg-[#f5f5f5] p-3 rounded-lg`}
                    onPress={showDateTimePicker}
                >
                    <Text style={tw`text-base text-[#999999]`}>Date of birth</Text>
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onDateChange}
                    />
                )}
            </View>
            <Picker
                style={tw`text-[#999999] bg-[#f5f5f5] rounded-lg overflow-hidden`}
                selectedValue={selectedGender}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedGender(itemValue)
                }>
                <Picker.Item label="Male" value="0" />
                <Picker.Item label="Female" value="1" />
            </Picker>
            <TextInput
                placeholder='Country...'
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg my-3`}
            />
            <TextInput
                placeholder='Province...'
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg`}
            />
            <TextInput
                placeholder='District...'
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg my-3`}
            />
            <TextInput
                placeholder='Ward...'
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg`}
            />
            <TextInput
                placeholder='Specific...'
                style={tw`text-base text-black bg-[#f5f5f5] px-3 rounded-lg my-3`}
            /> */}
            {registerWarn ? (
                <Text style={tw`text-red-500 text-sm mt-2`}>{registerWarn}</Text>
            ) : (
                <></>
            )}
            <TouchableOpacity
                onPress={() => {
                    handleRegister();
                    // navigation.navigate(ROUTER.VERIFY_CODE_SCREEN, { user_email })
                }}
                style={tw`p-3 bg-[${COLOR.PRIMARY}] rounded-lg mt-8`}
            >
                <Text style={tw`text-center text-white text-xl font-medium`}>REGISTER</Text>
            </TouchableOpacity>
            <View style={tw`flex flex-row items-center justify-center mb-5`}>
                <Text style={tw`text-base`}>Already have an account?</Text>
                <TouchableOpacity
                    onPress={handleSendOTPClick}
                    // onPress={() => navigation.navigate(ROUTER.LOGIN)}
                    style={tw`p-1.5`}
                >
                    <Text style={tw`text-base text-[${COLOR.PRIMARY}] font-medium`}>Login here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}