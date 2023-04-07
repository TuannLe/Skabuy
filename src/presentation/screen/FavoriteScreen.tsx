import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { useDispatch, useSelector } from "react-redux";
import * as ACT_FAVORITE from '../../core/redux/actions/favorite'
import { ROUTER } from '../constants';
import Product_Item from '../components/Product_Item'
import DeleteFavoriteItem from '../modal/DeleteFavoriteItem';
import { useIsFocused } from '@react-navigation/native'

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
            <View style={tw`flex flex-row items-center pl-3 justify-between`}>
                <Text style={tw`text-2xl text-black font-medium`}>Favorite</Text>
                <TouchableOpacity
                    style={tw`p-3`}
                    onPress={handleDelete}
                >
                    <Text style={tw`text-lg text-red-500 font-medium`}>Delete all</Text>
                </TouchableOpacity>
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
                            <View style={tw`flex-1 justify-center h-full`}>
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