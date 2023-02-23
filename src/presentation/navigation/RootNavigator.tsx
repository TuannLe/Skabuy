import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomNavigator from './BottomNavigator'
import CategoryScreen from '../screen/CategoryScreen'
import CartScreen from '../screen/CartScreen'
import { ROUTER } from '../constants'
import DrawerNavigator from './DrawerNavigator'

export default function RootNavigator() {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Root'
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.FAVORITE_TAB}
                component={CategoryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.CART_TAB}
                component={CartScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}