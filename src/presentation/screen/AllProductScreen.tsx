import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from "react-redux";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ROUTER, COLOR } from '../constants'
import Product_Item from '../components/Product_Item'
import FilterModal from '../modal/FilterModal'

export default function AllProductScreen({ route, navigation }: any) {
    const { IDCategory, NameCategory } = route.params
    const [visible, setVisibility] = useState(false)
    const ArrayProduct = useSelector((state: any) => state.product.productsByCategory)
    const handleVisible = () => {
        setVisibility(!visible)
    }

    return (
        <View style={tw`flex w-full h-full`}>
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-4 pr-8`}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>{NameCategory}</Text>
            </View>
            <View style={tw`flex flex-row bg-white pr-3`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTER.FILTER_SCREEN, { IDCategory: IDCategory })}
                    style={tw`flex flex-row items-center p-2`}
                >
                    <AntDesign name='filter' style={tw`text-2xl`} />
                    <Text style={tw`text-lg font-medium`}>Filter</Text>
                </TouchableOpacity>
                <View style={tw`flex-1 `}>

                </View>
            </View>
            <View style={tw`flex-1 px-1`}>
                {
                    ArrayProduct?.length
                        ? (
                            <FlatList
                                data={ArrayProduct}
                                numColumns={3}
                                renderItem={(item) => <Product_Item item={item.item} />}
                                keyExtractor={item => item.product_id}
                                showsHorizontalScrollIndicator={false}
                            // ListFooterComponent={
                            //     <View style={tw`flex flex-row items-center justify-center my-3`}>
                            //         <TouchableOpacity
                            //             style={tw`px-3 py-2 bg-[${COLOR.PRIMARY}] rounded-md mx-1.5`}
                            //         >
                            //             <Text style={tw`text-base text-[${COLOR.WHITE}] font-medium`}>1</Text>
                            //         </TouchableOpacity>
                            //         <TouchableOpacity
                            //             style={tw`px-3 py-2 bg-[${COLOR.PRIMARY}] rounded-md mx-1.5`}
                            //         >
                            //             <Text style={tw`text-base text-[${COLOR.WHITE}] font-medium`}>2</Text>
                            //         </TouchableOpacity>
                            //         <TouchableOpacity
                            //             style={tw`px-3 py-2 bg-[${COLOR.PRIMARY}] rounded-md mx-1.5`}
                            //         >
                            //             <Text style={tw`text-base text-[${COLOR.WHITE}] font-medium`}>3</Text>
                            //         </TouchableOpacity>
                            //     </View>
                            // }
                            />
                        )
                        : (
                            <View style={tw`flex-1 justify-center h-full`}>
                                <Text style={tw`text-lg font-medium text-center`}>No products</Text>
                            </View>
                        )
                }
            </View>
            <FilterModal
                visible={visible}
                handleVisible={handleVisible}
            />
        </View>
    )
}