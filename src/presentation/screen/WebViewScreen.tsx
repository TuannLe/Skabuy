import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import tw from 'twrnc'
import { WebView } from 'react-native-webview';
import { useSelector } from "react-redux";

export default function () {
    const webViewRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const ArrayProduct = useSelector((state: any) => state.cart.products)

    const onMessage = (event: any) => {
        console.log(event.nativeEvent.data);
    };

    // window.alert(localStorage.getItem("checkout_data"))`;
    const getCookie = () => {
        const script = `
        const item = localStorage.getItem('checkout_data');
        window.alert(item)`;
        webViewRef.current.injectJavaScript(script);
    }

    const setItemScript = `
        localStorage.setItem("skabuy_cart", JSON.stringify(
            [{"product_id":79,"product_image":"https://res.cloudinary.com/dwd5gmp97/image/upload/v1678683579/dmw29p4j8oq0fcvycxtr.webp","product_name":"Solartec Outdoor Rectangle Pet Cot","price":74.25,"quantity":1,"characteristics":{"characteristics_hash":"01f46198-5501-420c-b90f-3a0b46d2154d","values":'Size: 24"x18"; Color: Brown',"total":10},"totalprice":74.25}]
        ));
        localStorage.setItem("checkout_data", JSON.stringify(
            {"checkoutData":{"dataProduct":[{"product_id":79,"product_name":"Solartec Outdoor Rectangle Pet Cot","quantity":1,"description":'Size: 24"x18"; Color: Brown',"hash":"01f46198-5501-420c-b90f-3a0b46d2154d","price":74.25}],"user_id":34,"fullname":"Việt Thắng","email":"vthcvn@gmail.com","phonenumber":"0377196605","address":"street, apt, city, state, zip","total_price":74.25,"method_payment":0,"paymentInfo":null,"voucher":null},"subtotal":74.25,"totalPayment":74.25,"voucher":null}
        ))
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
        <SafeAreaView style={tw`flex w-full h-full`}>
            <WebView
                ref={webViewRef}
                onLoadStart={handleWebViewNavigationStateChange}
                onLoadEnd={handleWebViewNavigationStateChange}
                onLoad={handleWebViewNavigationStateChange}
                onMessage={onMessage}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: 'https://skabuy.com/process-checkout' }}
            />
            <TouchableOpacity style={tw`p-3`} onPress={getCookie}>
                <Text>Get cookie</Text>
            </TouchableOpacity>
            {visible ? (
                <ActivityIndicatorElement />
            ) : null}
        </SafeAreaView>
    )
}