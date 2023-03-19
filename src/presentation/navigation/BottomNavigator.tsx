import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import tw from 'twrnc'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Foundation from 'react-native-vector-icons/Foundation'
import { HomeScreen, FavoriteScreen, ProfileScreen, LoginScreen } from '../screen'

export default function BottomNavigator() {
    const BottomTab = createBottomTabNavigator();
    const token = 'hhhh'
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
            {token ? (
                <BottomTab.Screen
                    name='ProfileTab'
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