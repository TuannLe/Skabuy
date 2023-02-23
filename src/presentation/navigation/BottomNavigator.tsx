import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import tw from 'twrnc'
import Octicons from 'react-native-vector-icons/Octicons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../screen/HomeScreen'
import FavoriteScreen from '../screen/FavoriteScreen'
import ProfileScreen from '../screen/ProfileScreen'

export default function BottomNavigator() {
    const BottomTab = createBottomTabNavigator();
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
                                <Octicons name="home" size={24} color={color} />
                            ) : (
                                <Octicons name="home" size={24} color={color} />
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
                                <Ionicons name="ios-heart-outline" size={24} color={color} />
                            ) : (
                                <Ionicons name="ios-heart-sharp" size={24} color={color} />
                            )}
                        </>
                    )
                }}
            />
            <BottomTab.Screen
                name='ProfileTab'
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: (({ focused, color }) =>
                        <>
                            {focused ? (
                                <Ionicons name="home" size={28} color={color} />
                            ) : (
                                <Ionicons name="home" size={24} color={color} />
                            )}
                        </>
                    )
                }}
            />
        </BottomTab.Navigator>
    )
}