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
const image_banner = [
    'https://skabuy.com/banners/banner_1.jpg',
    'https://skabuy.com/banners/banner_2.jpg',
    'https://skabuy.com/banners/banner_3.jpg'
]
const WIDTH = Dimensions.get('window').width;
const HEIGTH = Dimensions.get('window').height;

export default function Slider() {
    return (
        <View style={tw`bg-red-400`}>
            <Carousel
                loop
                width={WIDTH}
                height={HEIGTH * 0.19}
                autoPlay={true}
                data={[...new Array(3).keys()]}
                scrollAnimationDuration={1500}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View style={tw`justify-center`}>
                        <Image
                            style={{ width: WIDTH, height: HEIGTH * 0.19 }}
                            source={{ uri: image_banner[index] }}
                        />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})