import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import tw from 'twrnc'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import { useDispatch, useSelector } from "react-redux";
import { HomeScreen, FavoriteScreen, ProfileScreen, LoginScreen } from '../screen'
import { ROUTER } from '../constants'

export default function BottomNavigator() {
    const BottomTab = createBottomTabNavigator();
    const token = useSelector((state: any) => state.auth.token)
    const infoUser = useSelector((state: any) => state.auth.infoUser)
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name='HomeTab'
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: (({ focused, color }) =>
                        <>
                            {focused ? (
                                <Foundation name="home" size={28} color={color} />
                            ) : (
                                <Octicons name="home" size={23} color={color} />
                            )}
                        </>
                    )
                }}
            />
            <BottomTab.Screen
                name='FavoriteTab'
                component={FavoriteScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: (({ focused, color }) =>
                        <>
                            {focused ? (
                                <Ionicons name="ios-heart-sharp" size={26} color={color} />
                            ) : (
                                <Ionicons name="ios-heart-outline" size={26} color={color} />
                            )}
                        </>
                    )
                }}
            />
            {token && infoUser ? (
                <BottomTab.Screen
                    name={ROUTER.PROFILE_TAB}
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: (({ focused, color }) =>
                            <>
                                {focused ? (
                                    <Ionicons name="ios-person" size={28} color={color} />
                                ) : (
                                    <Ionicons name="ios-person-outline" size={24} color={color} />
                                )}
                            </>
                        )
                    }}
                />
            ) : (
                <BottomTab.Screen
                    name='LoginTab'
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarIcon: (({ focused, color }) =>
                            <>
                                {focused ? (
                                    <Ionicons name="ios-person" size={28} color={color} />
                                ) : (
                                    <Ionicons name="ios-person-outline" size={24} color={color} />
                                )}
                            </>
                        )
                    }}
                />
            )}
        </BottomTab.Navigator>
    )
}