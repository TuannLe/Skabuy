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

const WIDTH = Dimensions.get('window').width;

export default function Slider({item} : any) {

    return (
        <View style={tw`flex-1 mt-2 mb-2`}>
            <Carousel
                loop
                width={WIDTH}
                height={120}
                autoPlay={true}
                data={[...new Array(3).keys()]}
                scrollAnimationDuration={1500}
                renderItem={({ index }) => (
                    <View style={tw`flex-1 justify-center`}>
                        <Image
                            style={{ width: WIDTH, height: 120}}
                            source={{ uri: item[index] }}
                        />

                    </View>
                )}
            />
        </View>
    )
}