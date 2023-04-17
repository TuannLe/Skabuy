import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomNavigator from './BottomNavigator'
import {
    CartScreen,
    LoginScreen,
    RegisterScreen,
    CategoryScreen,
    VerifyCodeScreen,
    AllProductScreen,
    ProductDetailScreen,
    ProcessScreen,
    WebViewScreen,
    FilterScreen,
    PaymentDetail,
    SearchResultScreen,
    OrderDetailScreen,
    FilterSearchScreen,
    EditProfileScreen
} from '../screen'
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
            <Stack.Screen
                name={ROUTER.ALL_PRODUCTS_SCREEN}
                component={AllProductScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.PRODUCT_DETAILS}
                component={ProductDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.PROCESS_SCREEN}
                component={ProcessScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.WEBVIEW_SCREEN}
                component={WebViewScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.FILTER_SCREEN}
                component={FilterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.PAYMENT_DETAIL_SCREEN}
                component={PaymentDetail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.SEARCH_RESULT_SCREEN}
                component={SearchResultScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.EDIT_PROFILE_SCREEN}
                component={EditProfileScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.ORDER_DETAIL_SCREEN}
                component={OrderDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTER.FILTER__SEARCH_SCREEN}
                component={FilterSearchScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}