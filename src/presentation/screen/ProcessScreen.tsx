import { View, Text, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from "react-redux";
import ItemCart from '../components/ItemCart'
import { COLOR } from '../constants'
import { Picker } from '@react-native-picker/picker';

export default function ProcessScreen({ navigation }: any) {

    const [selectedValue, setSelectedValue] = useState("");

    return (
        <View style={tw`relative w-full h-full font-sans`}>
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-4 pr-8`}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-bold text-white text-center`}>Process To Checkout</Text>
            </View>

            <ScrollView>
                <View style={tw`relative p-2 bg-white`}>
                    <Text style={tw`text-2xl font-semibold text-black text-center my-2`}>Billing Address</Text>
                    <View>
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Full Name</Text>
                        <TextInput 
                            style={tw`border rounded border-[#b1becb] p-2 mb-2`}
                            placeholder={"Full name"}
                        />
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Gender</Text>
                        <View style={tw`border rounded border-[#b1becb] h-12 justify-center mb-2`}>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue) }
                            >
                                <Picker.Item label="-- Gender --"/>
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        </View>

                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Street address</Text>
                        <TextInput 
                            style={tw`border rounded border-[#b1becb] p-2 mb-5`}
                            placeholder={"Street address"}
                        />
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Apt., ste., bldg.</Text>
                        <TextInput 
                            style={tw`border rounded border-[#b1becb] p-2 mb-5`}
                            placeholder={"Apt., ste., bldg."}
                        />
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>City</Text>
                        <TextInput 
                            style={tw`border rounded border-[#b1becb] p-2 mb-5`}
                            placeholder={"City"}
                        />
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>State</Text>
                        <TextInput 
                            style={tw`border rounded border-[#b1becb] p-2 mb-5`}
                            placeholder={"State"}
                        />
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>ZIP code</Text>
                        <TextInput 
                            style={tw`border rounded border-[#b1becb] p-2 mb-5`}
                            placeholder={"ZIP code"}
                        />

                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>Phone Number</Text>
                        <TextInput 
                            style={tw`border rounded border-[#b1becb] p-2 mb-2`}
                            placeholder={"Phone number"}
                        />
                        <Text style={tw`mb-1 text-base font-medium text-slate-800`}>E-mail</Text>
                        <TextInput 
                            style={tw`border rounded border-[#b1becb] p-2 mb-30`}
                            placeholder={"E-mail"}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={tw`absolute bg-white bottom-0 left-0 right-0 h-19`}>
                <View style={tw`h-full bg-white px-3`}>
                    <TouchableOpacity
                        // onPress={() => navigation1.navigate(ROUTER.PROCESS_SCREEN)}
                        style={tw`p-3 bg-[${COLOR.PRIMARY}] my-3 rounded-md`}
                    >
                        <Text style={tw`text-white text-xl font-medium text-center`}>Process To Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}