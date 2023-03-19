import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../constants'
import { AllOrder, Processing, Delivering, Delivered, Cancelled, Refund } from '../components/MyOrder'

const Tab = createMaterialTopTabNavigator();
export default function MyOrder() {
    return (
        <Tab.Navigator
            style={tw`overflow-scroll`}
            screenOptions={{
                tabBarStyle: tw`h-13`,
                tabBarItemStyle: tw`w-30`,
                tabBarScrollEnabled: true,
                tabBarIndicatorStyle: tw`bg-[#17a2b8] h-[3px]`,
                tabBarShowLabel: true,
                tabBarLabelStyle: tw`capitalize text-base`,
                tabBarShowIcon: false,
            }}
        >
            <Tab.Screen
                name='All Orders'

                component={AllOrder}
                options={{
                    tabBarIcon: (({ focused }) =>
                        <>
                            {focused ? (
                                <Ionicons name="ios-grid" style={tw`text-pink-500 text-lg`} />
                            ) : (
                                <Ionicons name="ios-grid-outline" style={tw`text-black text-lg`} />
                            )}
                        </>
                    ),
                }}
            />
            <Tab.Screen
                name='Processing'
                component={Processing}
                options={{
                    tabBarIcon: (({ focused }) =>
                        <>
                            {focused ? (
                                <Ionicons name="ios-heart" style={tw`text-pink-500 text-xl`} />

                            ) : (
                                <Ionicons name="heart-outline" style={tw`text-black text-xl`} />
                            )}
                        </>
                    ),
                }}
            />
            <Tab.Screen
                name='Delivering'
                component={Delivering}
                options={{
                    tabBarIcon: (({ focused }) =>
                        <>
                            {focused ? (
                                <Ionicons name="md-lock-closed" style={tw`text-pink-500 text-xl`} />
                            ) : (
                                <Ionicons name="md-lock-closed-outline" style={tw`text-black text-xl`} />
                            )}
                        </>
                    ),
                }}
            />
            <Tab.Screen
                name='Delivered'
                component={Delivered}
                options={{
                    tabBarIcon: (({ focused }) =>
                        <>
                            {focused ? (
                                <Ionicons name="md-lock-closed" style={tw`text-pink-500 text-xl`} />
                            ) : (
                                <Ionicons name="md-lock-closed-outline" style={tw`text-black text-xl`} />
                            )}
                        </>
                    ),
                }}
            />
            <Tab.Screen
                name='Cancelled'
                component={Cancelled}
                options={{
                    tabBarIcon: (({ focused }) =>
                        <>
                            {focused ? (
                                <Ionicons name="md-lock-closed" style={tw`text-pink-500 text-xl`} />
                            ) : (
                                <Ionicons name="md-lock-closed-outline" style={tw`text-black text-xl`} />
                            )}
                        </>
                    ),
                }}
            />
            <Tab.Screen
                name='Refund'
                component={Refund}
                options={{
                    tabBarIcon: (({ focused }) =>
                        <>
                            {focused ? (
                                <Ionicons name="md-lock-closed" style={tw`text-pink-500 text-xl`} />
                            ) : (
                                <Ionicons name="md-lock-closed-outline" style={tw`text-black text-xl`} />
                            )}
                        </>
                    ),
                }}
            />

        </Tab.Navigator>
    )
}