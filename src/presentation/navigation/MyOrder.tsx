import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AllOrder, Processing, Delivering, Delivered, Cancelled, Refund } from '../components/MyOrder'

const Tab = createMaterialTopTabNavigator();
export default function MyOrder() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: tw`h-12`,
                tabBarIndicatorStyle: tw`bg-pink-500`,
                tabBarShowLabel: false,
                tabBarShowIcon: true,
            }}
        >
            <Tab.Screen
                name='PostsTab'
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
                name='HeartTab'
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
                name='PostsHide'
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
                name='PostsHide2'
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
                name='PostsHide3'
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
                name='PostsHide4'
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