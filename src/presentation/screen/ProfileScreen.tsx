import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MyOrder from '../navigation/MyOrder';
import { ROUTER, COLOR } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const data = [
        {
            'name': 'hahah'
        }
    ]
    return (
        <SafeAreaView style={tw`flex w-full h-full`}>
            <View style={tw`bg-[${COLOR.PRIMARY}] px-3`}>
                <View style={tw`flex flex-row items-center justify-end`}>
                    <TouchableOpacity
                        // onPress={}
                        style={tw`p-3`}
                    >
                        <Ionicons name='settings-outline' style={tw`text-2xl text-[${COLOR.WHITE}]`} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`p-3`}
                    >
                        <Feather name='shopping-cart' style={tw`text-2xl text-[${COLOR.WHITE}]`} />
                    </TouchableOpacity>
                </View>
                <View style={tw`mb-3`}>
                    <Text style={tw`text-2xl text-[${COLOR.WHITE}] font-bold`}>username</Text>
                    <Text style={tw`text-xl text-[${COLOR.WHITE}] font-medium`}>Email</Text>
                </View>
            </View>
            <View style={tw`mt-3 bg-white`}>
                <TouchableOpacity
                    style={tw`flex flex-row items-center p-3 `}
                >
                    <Ionicons name="ios-person-outline" style={tw`text-3xl text-[${COLOR.BLACK}] mr-1.5`} />
                    <Text style={tw`text-lg text-[${COLOR.BLACK}] font-medium`}>Edit profile</Text>
                </TouchableOpacity>
                <View style={tw`mx-3 bg-gray-200 h-[1px]`}></View>
                <View style={tw`flex flex-row items-center justify-between pl-3`}>
                    <View style={tw`flex flex-row items-center`}>
                        <MaterialIcons name='list-alt' style={tw`text-3xl text-[${COLOR.BLACK}] mr-1.5`} />
                        <Text style={tw`text-lg text-[${COLOR.BLACK}] font-medium`}>My orders</Text>
                    </View>
                    <TouchableOpacity
                        style={tw`flex flex-row items-center p-3.5`}
                    >
                        <Text style={tw`text-base text-[${COLOR.GRAY}]`}>History</Text>
                        <Ionicons name='chevron-forward' style={tw`text-xl text-[${COLOR.GRAY}]`} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={tw`flex-1`}>
                <MyOrder />
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate(ROUTER.LOGIN)}
                style={tw`p-3 bg-red-500 mb-10`}
            >
                <Text>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}