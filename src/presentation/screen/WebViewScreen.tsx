import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import tw from 'twrnc'
import { WebView } from 'react-native-webview';
import { useSelector } from "react-redux";

export default function () {
    const webViewRef = useRef(null);
    const ArrayProduct = useSelector((state: any) => state.cart.products)

    const setCookie = () => {
        // const cookie = `skabuy_cart=${JSON.stringify(ArrayProduct)}`;
        const check = `JSON.parse(localStorage.getItem(skabuy_cart))`
        // const script = `localStorage.setItem(skabuy_cart, ${JSON.stringify(ArrayProduct)})`;
        const script = `console.log(${check})`
        webViewRef.current.injectJavaScript(script);
    };

    return (
        <WebView
            ref={webViewRef}
            onLoad={setCookie}
            source={{ uri: 'https://skabuy.com' }}
        />
    )
}