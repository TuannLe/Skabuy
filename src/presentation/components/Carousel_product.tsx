import { 
    View, 
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    Dimensions,
    Image
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import React, { useState } from 'react'
import tw from 'twrnc'
import index from '../navigation';
const image_product = [
    'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
    'https://skabuy.com/Upload/ImageProduct/product_1673264594397.png',
    'https://skabuy.com/Upload/ImageProduct/product_1673317543489.png',
    'https://skabuy.com/Upload/ImageProduct/product_1673264594397.png',
    'https://skabuy.com/Upload/ImageProduct/product_1673317543489.png'
]
const PAGE_WIDTH = Dimensions.get('window').width;


export default function Carousel_product() {

    
    return (
        <View style={tw`flex-1 h-60 pb-40`}>
            {/* <ScrollView> */}
                <View style={tw`h-60 mt-60`}>
                    <View style={tw`flex-2`}>
                        <Image 
                            source={{uri: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png'}} 
                            style={{flex: 1, resizeMode: "cover", width: 130, height: 130}}
                        />
                    </View>
                    <View style={tw`flex-2`}>
                        <Image 
                            source={{uri: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png'}} 
                            style={{flex: 1, resizeMode: "cover", width: 130, height: 130}}
                        />
                    </View>
                    <View style={tw`flex-2`}>
                        <Image 
                            source={{uri: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png'}} 
                            style={{flex: 1, resizeMode: "cover", width: 130, height: 130}}
                        />
                    </View>
                </View>
            {/* </ScrollView> */}
        </View>
    )
}