import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'
import * as ACT_FAVORITE from '../../core/redux/actions/favorite'
import Product_Item from '../components/Product_Item'
import DeleteFavoriteItem from '../modal/DeleteFavoriteItem';
import { ROUTER, COLOR } from '../constants'

export default function FavoriteScreen() {
    const dispatch = useDispatch()
    const data = useSelector((state: any) => state.favorite.favorite)
    const [isVisible, setVisible] = useState(false)
    const [isIdSelected, setIdSelected] = useState(null)

    const handleVisibleDeleteModal = () => {
        setVisible(!isVisible)
    }

    const showConfirmDialog = () => {
        return Alert.alert(
            "Confirm",
            "Are you sure you want to delete all items?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(ACT_FAVORITE.RemoveAllFavorite())
                        return
                    }
                },
                {
                    text: "No",
                    onPress: () => {

                        return
                    }
                }
            ]
        )
    }

    const handleDelete = () => {
        showConfirmDialog()
    }
    useIsFocused()

    return (
        <View style={tw`w-full h-full`}>
            {/* <View style={tw`flex flex-row items-center pl-3 justify-between`}>
                <Text style={tw`text-2xl text-black font-medium`}>Favorite</Text>
            </View> */}
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>Favorite</Text>
                {
                    data?.length ? (
                        <TouchableOpacity
                            style={tw`absolute top-0 right-0 py-3.5 px-3`}
                            onPress={handleDelete}
                        >
                            <Ionicons name='trash-outline' style={tw`text-red-600 text-2xl`} />
                        </TouchableOpacity>
                    ) : null
                }
            </View>
            <View style={tw`px-2.5 mb-13`}>
                {
                    data?.length
                        ? (
                            <FlatList
                                data={data}
                                numColumns={3}
                                renderItem={(item) =>
                                    <Product_Item
                                        item={item.item}
                                        handleVisible={handleVisibleDeleteModal}
                                        setIdSelected={setIdSelected}
                                    />}
                                keyExtractor={item => item.product_id}
                                showsHorizontalScrollIndicator={false}
                            />
                        )
                        : (
                            <View style={tw`w-full justify-center h-full`}>
                                <Text style={tw`text-lg font-medium text-center`}>You don't have favorite item</Text>
                            </View>
                        )
                }
            </View>
            <DeleteFavoriteItem
                handleVisible={handleVisibleDeleteModal}
                isVisible={isVisible}
                isIdSelected={isIdSelected}
            />
        </View>
    )
}