import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import tw from 'twrnc'
import { WebView } from 'react-native-webview';
import { useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ROUTER, COLOR } from '../constants'

export default function ({ route, navigation }: any) {
    const webViewRef = useRef(null);
    const [visible, setVisible] = useState(true);
    const ArrayProduct = useSelector((state: any) => state.cart.products)
    const { data, arrayCheckout } = route.params;

    const onMessage = (event: any) => {
        console.log(event.nativeEvent.data);
    };

    const getCookie = () => {
        const script = `
        const item = localStorage.getItem('skabuy_cart');
        window.alert(item)`;
        webViewRef.current.injectJavaScript(script);
    }

    const setItemScript = `
        const myObj = ${JSON.stringify(data)};
        const myObj2 = ${JSON.stringify(arrayCheckout)}
        localStorage.setItem("skabuy_cart", JSON.stringify(myObj2));
        localStorage.setItem("checkout_data", JSON.stringify(myObj))
    `;

    const handleWebViewNavigationStateChange = (newNavState: any) => {
        webViewRef.current.injectJavaScript(setItemScript);
    }

    const ActivityIndicatorElement = () => {
        return (
            <View style={tw`flex-1 justify-center absolute m-auto left-0 right-0 top-0 bottom-0`}>
                <ActivityIndicator color="gray" size="large" />
            </View>
        )
    }

    return (
        <SafeAreaView style={tw`w-full h-full`}>
            <View style={tw`flex flex-row items-center z-10 absolute top-0 right-0 left-0 h-15 bg-[${COLOR.PRIMARY}]`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-4 pr-8`}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>Checkout</Text>
            </View>
            <WebView
                ref={webViewRef}
                onEnter={handleWebViewNavigationStateChange}
                onLoadStart={handleWebViewNavigationStateChange}
                onLoadEnd={() => setVisible(false)}
                onLoad={handleWebViewNavigationStateChange}
                onMessage={onMessage}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: 'https://skabuy.com/process-checkout' }}
            />
            {/* <TouchableOpacity style={tw`p-3`} onPress={getCookie}>
                <Text>Get cookie</Text>
            </TouchableOpacity> */}
            {visible ? (
                <ActivityIndicatorElement />
            ) : null}
        </SafeAreaView>
    )
}