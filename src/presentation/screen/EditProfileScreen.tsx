import { View, Text, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from "react-redux";
import { Picker } from '@react-native-picker/picker';
import PhoneInput from 'react-native-phone-input'
import { ROUTER, COLOR } from '../constants'
import DatePicker from 'react-native-date-picker'
import { formatPostbirddate, formatbirddate, formatdate } from '../../util/helper';
import AXIOS from '../../core/api';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function EditProfileScreen({ route, navigation }: any) {
    const userRedux = useSelector((state: any) => state.auth.infoUser);

    const [userAddress, setUserAddress] = useState(userRedux?.user_address.split(/[,]/)[0].trim())
    const [user_apt, setUserApt] = useState(userRedux?.user_address.split(/[,]/)[1].trim())
    const [user_city, setUserCity] = useState(userRedux?.user_address.split(/[,]/)[2].trim())
    const [user_state, setUserState] = useState(userRedux?.user_address.split(/[,]/)[3].trim())
    const [user_zipCode, setUserZipCode] = useState(userRedux?.user_address.split(/[,]/)[4].trim())
    const [address, setAddress] = useState('')

    const [date, setDate] = useState(new Date(userRedux?.user_date_of_birth))
    const [open, setOpen] = useState(false)


    const [checkoutData, setCheckoutData] = useState({
        user_id: userRedux?.user_id,
        user_fullname: userRedux?.user_fullname,
        user_email: userRedux?.user_email,
        user_phone_number: userRedux?.user_phone_number,
        user_gender: userRedux?.user_gender,
        user_date_of_birth: formatPostbirddate(date),
        user_address: address
    })

    const postEditUser = async () => {
        try {
            console.log(formatPostbirddate(date))
            console.log(checkoutData)
            const res = await AXIOS.post(`user/editUser`, checkoutData, { headers: { "Content-Type": "application/json" } }).then((result) => result.data);
            if (res.status == "success") {
                console.log("success")
            } else {
                console.log("fail")
            }
        } catch (error) {
            return error;
        }
    }


    useEffect(() => {
        setAddress(`${userAddress}, ${user_apt}, ${user_city}, ${user_state}, ${user_zipCode}`)

        setCheckoutData((current) => ({
            ...current,
            user_date_of_birth: formatPostbirddate(date),
            user_address: address,
        }))
    }, [address, date])

    useEffect(() => {
        console.log(userRedux?.user_address.split(/[,]/))
    }, [])

    return (
        <View style={tw`relative w-full h-full font-sans`}>
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-4 pr-8`}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>Edit Profile</Text>
            </View>
            <ScrollView>
                <View style={tw`relative p-2 bg-white`}>
                    <View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Full Name</Text>
                            <TextInput
                                style={tw`text-base border rounded border-[#b1becb] p-2`}
                                placeholder={"Full name"}
                                value={checkoutData.user_fullname}
                                onChangeText={(val: any) => setCheckoutData((current) => ({
                                    ...current,
                                    user_fullname: val,
                                }))}
                            />
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>E-mail</Text>
                            <View
                                style={tw`border border-[#b1becb] px-2 py-2.5 text-base text-black bg-gray-200 rounded`}
                            >
                                <Text style={tw`text-base text-black`}>{checkoutData.user_email}</Text>
                            </View>
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Phone Number</Text>
                            <View style={tw`border rounded border-[#b1becb] h-11 px-2 justify-center`}>
                                <PhoneInput
                                    ref={(ref) => { this.phone = ref }}
                                    onPressFlag={this.onPressFlag}
                                    initialCountry={'us'}
                                    initialValue={checkoutData.user_phone_number}
                                    onChangePhoneNumber={val => setCheckoutData((current) => ({
                                        ...current,
                                        user_phone_number: val,
                                    }))}
                                    textProps={{
                                        placeholder: 'Enter a phone number...'
                                    }}
                                    textStyle={{ fontSize: 16 }}
                                />
                            </View>
                        </View>
                        <View style={tw`mb-5`}>
                            <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Gender</Text>
                            <View style={tw`border rounded border-[#b1becb] h-11 justify-center`}>
                                <Picker
                                    style={tw`-mx-2`}
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
                    </View>
                    <View style={tw`mb-5`}>
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Date of birth</Text>
                        <View style={tw`border rounded border-[#b1becb] h-11 flex justify-center`}>
                            <Text
                                style={tw`ml-2 text-base text-black`}
                                onPress={() => setOpen(true)}
                            >{formatbirddate(date)}</Text>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                mode="date"
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </View>
                    </View>
                    <View style={tw`mb-5`}>
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Street address</Text>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            onPress={(data, details) => {
                                console.log(data);
                            }}
                            disableScroll={true}
                            query={{
                                key: 'AIzaSyA55C2BqefckdRTvvLvya4IOS4ksDnBh9I',
                                language: 'en',
                            }}
                            styles={{
                                textInputContainer: {
                                    width: '100%',
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                    borderColor: "#ced4da",
                                    borderRadius: 5,
                                },
                                description: {
                                    fontWeight: 'bold'
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                }
                            }}
                        />
                        {/* <TextInput
                            style={tw`text-base border rounded border-[#b1becb] p-2`}
                            placeholder={"Street address"}
                            value={userAddress}
                            onChangeText={val => setUserAddress(val)}
                        /> */}
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
                    <View style={tw`mb-20`}>
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>ZIP code</Text>
                        <TextInput
                            style={tw`text-base border rounded border-[#b1becb] p-2`}
                            placeholder={"ZIP code"}
                            value={user_zipCode}
                            onChangeText={val => setUserZipCode(val)}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={tw`absolute bg-white bottom-0 left-0 right-0 h-19`}>
                <View style={tw`h-full bg-white px-3`}>
                    <TouchableOpacity
                        onPress={() => postEditUser()}
                        style={tw`p-3 bg-[${COLOR.PRIMARY}] my-3 rounded-md`}
                    >
                        <Text style={tw`text-white text-xl font-medium text-center`}>Save Information</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}