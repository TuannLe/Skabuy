import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import tw from 'twrnc'
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, DrawerActions } from '@react-navigation/native';
import * as ACT_PRODUCT from '../../core/redux/actions/product'
import AXIOS from '../../core/api';
import { ROUTER } from '../constants';
import BottomNavigator from './BottomNavigator';
import { AllProductScreen } from '../screen';

const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
    const [allCategory, setAllCategory] = useState([])
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const getAllCategory = async () => {
        try {
            const res = await AXIOS.get(`category/all`);
            setAllCategory(res.data.data)
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    const handleGetProductByCategory = (IDCategory: any, NameCategory: any) => {
        dispatch(ACT_PRODUCT.GetProductByCategoryStart(IDCategory))
        dispatch(ACT_PRODUCT.GetAttributeByCategoryStart(IDCategory))
        navigation.navigate(ROUTER.ALL_PRODUCTS_SCREEN, { IDCategory: IDCategory, NameCategory: NameCategory })
    }

    const CustomDrawer = (props: any) => {
        return (
            <View style={tw`flex-1`}>
                <View style={tw`p-2.5`}>
                    {/* <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(ROUTER.HOME_TAB)
                        }}
                        style={tw`flex flex-row items-center p-2`}
                    >
                        <Image
                            source={{ uri: 'https://res.cloudinary.com/dwd5gmp97/image/upload/v1678522589/kur4rkcotplxeethbfsg.png' }}
                            style={tw`w-8 h-8 mr-3`}
                            resizeMode={'contain'}
                        />
                        <Text style={tw`text-black font-bold`}>Home</Text>
                    </TouchableOpacity> */}
                    {
                        allCategory.length ? (
                            <FlatList
                                data={allCategory}
                                renderItem={({ item }) =>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.dispatch(DrawerActions.toggleDrawer())
                                            handleGetProductByCategory(item.category_id, item.category_name)
                                        }}
                                        style={tw`flex flex-row items-center p-2`}
                                    >
                                        <Image
                                            source={{ uri: item.category_image }}
                                            style={tw`w-8 h-8 mr-3`}
                                            resizeMode={'contain'}
                                        />
                                        <Text style={tw`text-black font-bold`}>{item.category_name}</Text>
                                    </TouchableOpacity>
                                }
                                keyExtractor={item => item.category_id}
                            />
                        ) : null
                    }
                </View>
                {/* <DrawerContentScrollView>
                <DrawerItemList {...props} />
            </DrawerContentScrollView> */}
            </View>
        )
    }

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name={ROUTER.HOME_TAB} component={BottomNavigator} />
            <Drawer.Screen name={ROUTER.ALL_PRODUCTS_SCREEN} component={AllProductScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;