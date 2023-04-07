import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from "react-redux";
import * as ACT_AUTH from '../../core/redux/actions/auth'
import * as ACT_USER from '../../core/redux/actions/user'
import MyOrder from '../navigation/MyOrder';
import { ROUTER, COLOR } from '../constants'

export default function ProfileScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(ACT_AUTH.logout())
    }
    const infoUser = useSelector((state: any) => state.auth.infoUser)

    useEffect(() => {
        dispatch(ACT_USER.getOrderStart(infoUser?.user_id))
    }, [infoUser])
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
                        onPress={() => navigation.navigate(ROUTER.CART_TAB)}
                        style={tw`p-3`}
                    >
                        <Feather name='shopping-cart' style={tw`text-2xl text-[${COLOR.WHITE}]`} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={tw`p-3`}
                    >
                        <Ionicons name='ios-exit-outline' size={28} style={tw`text-[${COLOR.WHITE}]`} />
                    </TouchableOpacity>
                </View>
                <View style={tw`mb-3`}>
                    <Text style={tw`text-2xl text-[${COLOR.WHITE}] font-bold`}>{infoUser?.user_fullname}</Text>
                    <Text style={tw`text-xl text-[${COLOR.WHITE}] font-medium`}>{infoUser?.user_email}</Text>
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
        </SafeAreaView>
    )
}