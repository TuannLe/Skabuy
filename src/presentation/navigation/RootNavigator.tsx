import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomNavigator from './BottomNavigator'
import CategoryScreen from '../screen/CategoryScreen'

export default function RootNavigator() {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Root"
                component={BottomNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}