import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomNavigator from './BottomNavigator'
import { CartScreen, LoginScreen, RegisterScreen, CategoryScreen, VerifyCodeScreen } from '../screen'
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
            <Stack.Screen
                name={ROUTER.LOGIN}
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.REGISTER}
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.VERIFY_CODE_SCREEN}
                component={VerifyCodeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}