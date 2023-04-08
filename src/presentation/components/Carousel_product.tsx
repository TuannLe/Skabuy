import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    StatusBar,
    Dimensions,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import Product_Item from './Product_Item';

const PAGE_WIDTH = Dimensions.get('window').width;

export default function Carousel_product({ item }: any) {
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        if (item) {
            setIsloading(true);
        }
    }, []);

    return (
        <SafeAreaView style={tw`w-full`}>
            {isLoading ?
                <FlatList
                    data={item}
                    renderItem={({ item }) => <Product_Item item={item} />}
                    keyExtractor={item => item.product_id}
                    horizontal
                /> : <ActivityIndicator />
            }
        </SafeAreaView>
    )
}