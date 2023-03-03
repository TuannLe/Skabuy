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
import React, { useState } from 'react'
import tw from 'twrnc'
import index from '../navigation';
const image_product = [
    {
        product_id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
        product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
    },
    {
        product_id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
        product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
    },
    {
        product_id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba3',
        product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
    },
    {
        product_id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
        product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
    },
    {
        product_id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba5',
        product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
    },
    {
        product_id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        product_image: 'https://skabuy.com/Upload/ImageProduct/product_1673273882458.png',
    }

]
const PAGE_WIDTH = Dimensions.get('window').width;


export default function Carousel_product() {
    const [isLoading, setIsloading] = useState(true);

    const Item = ({product_image} : any) => (
        <View style={tw`border border-gray-300 p-8 rounded-xl justify-center`}>
            <Image
                style={tw`w-50 h-50`}
                source={{uri: product_image}}
            />
        </View>
    );
    
    return (
        <SafeAreaView style={tw`w-full h-50`}>
            {/* {isLoading ? <ActivityIndicator/> : ( */}
                <FlatList
                    data={image_product}
                    renderItem={({item}) => <Item product_image={item.product_image}/>}
                    keyExtractor={item => item.product_id}
                    horizontal
                />
            {/* )} */}
        </SafeAreaView>
    )
}