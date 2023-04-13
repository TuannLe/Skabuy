import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from "react-redux";
import { Picker } from '@react-native-picker/picker';
import PhoneInput from 'react-native-phone-input'
import { ROUTER, COLOR } from '../constants'

export default function ProcessScreen({ route, navigation }: any) {
    const userRedux = useSelector((state: any) => state.auth.infoUser);
    const { subTotal, total, arrayCheckout } = route.params

    const [userAddress, setUserAddress] = useState(userRedux?.user_address.split(/[,]/)[0].trim())
    const [user_apt, setUserApt] = useState(userRedux?.user_address.split(/[,]/)[1].trim())
    const [user_city, setUserCity] = useState(userRedux?.user_address.split(/[,]/)[2].trim())
    const [user_state, setUserState] = useState(userRedux?.user_address.split(/[,]/)[3].trim())
    const [user_zipCode, setUserZipCode] = useState(userRedux?.user_address.split(/[,]/)[4].trim())
    const [address, setAddress] = useState('')

    useEffect(() => {
        setAddress(`${userAddress}, ${user_apt}, ${user_city}, ${user_state}, ${user_zipCode}`)
    }, [userAddress, user_apt, user_city, user_state, user_zipCode])

    const [checkoutData, setCheckoutData] = useState({
        user_id: userRedux?.user_id,
        fullname: userRedux?.user_fullname,
        email: userRedux?.user_email,
        phonenumber: userRedux?.user_phone_number,
        user_gender: userRedux?.user_gender,
        address: address,
        total_price: total,
        method_payment: 0,
        paymentInfo: null,
        voucher: null,
    })

    const [data, setData] = useState({
        checkoutData: checkoutData,
        subtotal: subTotal,
        totalPayment: total,
        voucher: null,
    })

    useEffect(() => {
        setCheckoutData((current) => ({
            ...current,
            address: address,
        }))
    }, [address])

    useEffect(() => {
        setData((current) => ({
            ...current,
            checkoutData: checkoutData,
        }))
    }, [checkoutData])


    const handleCheckout = () => {
        navigation.navigate(ROUTER.WEBVIEW_SCREEN, { data: data, arrayCheckout: arrayCheckout })
    }

    return (
        <View style={tw`relative w-full h-full font-sans`}>
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-4 pr-8`}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>Process To Checkout</Text>
            </View>

            <ScrollView>
                <View style={tw`relative p-2 bg-white`}>
                    <Text style={tw`text-2xl font-semibold text-black text-center my-2`}>Billing Address</Text>
                    <View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Full Name</Text>
                            <TextInput
                                style={tw`text-base border rounded border-[#b1becb] p-2`}
                                placeholder={"Full name"}
                                value={checkoutData.fullname}
                                onChangeText={(val: any) => setCheckoutData((current) => ({
                                    ...current,
                                    fullname: val,
                                }))}
                            />
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Gender</Text>
                            <View style={tw`border rounded border-[#b1becb] h-11 justify-center`}>
                                <Picker
                                    selectedValue={checkoutData.user_gender}
                                    onValueChange={(itemValue, itemIndex) => setCheckoutData((current) => ({
                                        ...current,
                                        user_gender: itemValue,
                                    }))}
                                >
                                    <Picker.Item label="-- Gender --" />
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                </Picker>
                            </View>
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Street address</Text>
                            <TextInput
                                style={tw`text-base border rounded border-[#b1becb] p-2`}
                                placeholder={"Street address"}
                                value={userAddress}
                                onChangeText={val => setUserAddress(val)}
                            />
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Apt., ste., bldg.</Text>
                            <TextInput
                                style={tw`text-base border rounded border-[#b1becb] p-2`}
                                placeholder={"Apt., ste., bldg."}
                                value={user_apt}
                                onChangeText={val => setUserApt(val)}
                            />
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>City</Text>
                            <TextInput
                                style={tw`text-base border rounded border-[#b1becb] p-2`}
                                placeholder={"City"}
                                value={user_city}
                                onChangeText={val => setUserCity(val)}
                            />
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>State</Text>
                            <TextInput
                                style={tw`text-base border rounded border-[#b1becb] p-2`}
                                placeholder={"State"}
                                value={user_state}
                                onChangeText={val => setUserState(val)}
                            />
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>ZIP code</Text>
                            <TextInput
                                style={tw`text-base border rounded border-[#b1becb] p-2`}
                                placeholder={"ZIP code"}
                                value={user_zipCode}
                                onChangeText={val => setUserZipCode(val)}
                            />
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Phone Number</Text>
                            <View style={tw`border rounded border-[#b1becb] h-11 justify-center text-black`}>
                                <PhoneInput
                                    ref={(ref) => { this.phone = ref }}
                                    onPressFlag={this.onPressFlag}
                                    initialCountry={'us'}
                                    // initialValue={checkoutData.user_phone_number}
                                    onChangePhoneNumber={val => setCheckoutData((current) => ({
                                        ...current,
                                        user_phone_number: val,
                                    }))}
                                    textProps={{
                                        placeholder: 'Enter a phone number...'
                                    }}
                                />
                            </View>
                        </View>
                        <View style={tw`mb-30`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>E-mail</Text>
                            <View
                                style={tw`border border-[#b1becb] px-2 py-3 text-base text-black bg-gray-200 rounded`}
                            >
                                <Text style={tw`text-base text-black`}>{checkoutData.email}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={tw`absolute bg-white bottom-0 left-0 right-0 h-19`}>
                <View style={tw`h-full bg-white px-3`}>
                    <TouchableOpacity
                        onPress={() => handleCheckout()}
                        style={tw`p-3 bg-[${COLOR.PRIMARY}] my-3 rounded-md`}
                    >
                        <Text style={tw`text-white text-xl font-medium text-center`}>Process To Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}