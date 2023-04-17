import {
    View,
    Dimensions,
    Image
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import React, { useState } from 'react'
import tw from 'twrnc'

const WIDTH = Dimensions.get('window').width;

export default function Slider({ item }: any) {

    return (
        <View style={tw`flex-1`}>
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
                            style={{ width: WIDTH, height: 120 }}
                            source={{ uri: item[index] }}
                            resizeMode='cover'
                        />
                    </View>
                )}
            />
        </View>
    )
}