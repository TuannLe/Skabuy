import { View, Text, TouchableOpacity, Alert, TextInput, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import CheckBox from '@react-native-community/checkbox';
import { CheckBox } from '@rneui/themed';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    discountPrice,
    calculateTotalPrice,
    getVoucherStatus,
    formatNumber
} from "../../util/helper";
import * as ACT_CART from '../../core/redux/actions/cart'
import ItemCart from '../components/ItemCart'
import { ROUTER, COLOR } from '../constants'
import { onApplyVoucher } from '../../core/api/cartAPI'

export default function CartScreen({ navigation }: any) {
    const dispatch = useDispatch()
    const navigation1 = useNavigation();
    const [checked, setChecked] = React.useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [warn, setWarn] = useState('')
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherInfor, setVoucherInfor] = useState({});
    const [applied, setApplied] = useState(false);
    const ArrayProduct = useSelector((state: any) => state.cart.products)

    const handleChangeQuantity = (quantity: any, productID: any) => {
        if (quantity > 0) {
            dispatch(ACT_CART.ChangeQuantity({ quantity, productID }))
            loadTotalPayment()
        } else {
            console.log('hoh')
        }
    }

    const onApplyVoucherHandler = async () => {
        if (voucherCode) {
            if (applied) {
                setWarn("You have used one voucher");
            } else {
                const response = await onApplyVoucher(voucherCode)
                if (response.status === 3) {
                    setVoucherInfor(response);
                    setWarn('')
                    setTotal(
                        discountPrice(subTotal, response.voucher_infor.discount)
                    );
                    setApplied(true);
                } else {
                    setWarn(getVoucherStatus(response.status));
                }
            }
        } else {
            setWarn('Please enter voucher code')
        }
    };

    const onCancelApplyVoucher = () => {
        setTotal(subTotal);
        setVoucherCode('')
        setApplied(false);
    };

    const loadTotalPayment = () => {
        setSubTotal(calculateTotalPrice(ArrayProduct));
    };

    useEffect(() => {
        setTotal(subTotal);
    }, [subTotal]);

    useEffect(() => {
        loadTotalPayment();
    }, [ArrayProduct]);

    const showConfirmDialog = () => {
        return Alert.alert(
            "Confirm",
            "Are you sure you want to delete all items?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        dispatch(ACT_CART.RemoveAllCart())
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

    return (
        <View style={tw`relative w-full h-full`}>
            <View style={tw`relative flex flex-row border-b border-gray-200 bg-[${COLOR.PRIMARY}] p-3`}>
                <TouchableOpacity
                    style={tw`absolute top-0 left-0 py-2 pl-4 pr-8`}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesome name="angle-left" style={tw`text-white text-4xl`} />
                </TouchableOpacity>
                <Text style={tw`flex-1 text-2xl font-medium text-white text-center`}>Cart</Text>
            </View>
            {ArrayProduct?.length ? (
                <>
                    <View style={tw`flex flex-row items-center justify-between bg-white mt-3`}>
                        <CheckBox
                            checked={checked}
                            onPress={toggleCheckbox}
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor="green"
                            size={32}
                            style={tw`bg-pink-300`}
                        />
                        <TouchableOpacity
                            style={tw`p-3`}
                            onPress={handleDelete}
                        >
                            <Text style={tw`text-xl text-gray-500 font-medium`}>Delete all</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={ArrayProduct}
                        keyExtractor={(item, index) => item.product_id}
                        renderItem={({ item }) => {
                            return <ItemCart handleChangeQuantity={handleChangeQuantity} data={item} />;
                        }}
                        style={tw`${warn ? ('mb-85') : applied ? ('mb-73') : ('mb-79')}`}
                    />
                    <View style={tw`absolute bg-gray-100 bottom-0 left-0 right-0 ${warn ? (`h-85`) : applied ? ('h-73') : ('h-79')}`}>
                        {!applied && (
                            <View style={tw`flex flex-row my-1`}>
                                <TextInput
                                    placeholder="Voucher code..."
                                    style={tw`flex-1 p-3 text-lg bg-white`}
                                    value={voucherCode}
                                    onChangeText={val => setVoucherCode(val)}
                                />
                                <TouchableOpacity
                                    onPress={onApplyVoucherHandler}
                                    style={tw`p-3 bg-[${COLOR.PRIMARY}]`}
                                >
                                    <Text style={tw`text-white text-lg font-medium`}>Apply voucher</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {!applied && warn ? (
                            <Text style={tw`text-base text-red-600 bg-white px-3`}>*{warn}</Text>
                        ) : (
                            <></>
                        )}
                        <View style={tw`h-full bg-white px-3`}>
                            <Text style={tw`text-3xl text-black font-medium mb-3`}>Cart Summary</Text>
                            <View style={tw`flex flex-row items-center justify-between`}>
                                <Text style={tw`text-black text-xl`}>Subtotal</Text>
                                <Text style={tw`text-black text-xl font-medium`}>{formatNumber(subTotal)}</Text>
                            </View>
                            <View style={tw`flex flex-row items-center justify-between py-3`}>
                                <Text style={tw`text-black text-xl`}>Shipping</Text>
                                <Text style={tw`text-black text-xl font-medium`}>$0</Text>
                            </View>
                            {applied && (
                                <View style={tw`flex flex-row items-center justify-between`}>
                                    <Text style={tw`text-black text-xl`}>{`Voucher ${voucherInfor?.voucher_infor?.code_sale}: ${voucherInfor.voucher_infor.discount}% off sale`}</Text>
                                    <TouchableOpacity
                                        style={tw`px-1.5 py-0.5 bg-red-600 rounded-lg`}
                                        onPress={onCancelApplyVoucher}
                                    >
                                        <Ionicons name='ios-close-outline' style={tw`text-white text-2xl`} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            <View style={tw`flex flex-row items-center justify-between pt-2 mt-3 border-t border-gray-300`}>
                                <Text style={tw`text-black text-3xl font-medium`}>Total</Text>
                                <Text style={tw`text-red-600 text-3xl font-medium`}>{formatNumber(total)}</Text>
                            </View>
                            <TouchableOpacity
                                style={tw`p-3 bg-[${COLOR.PRIMARY}] my-3 rounded-md`}
                                onPress={() => navigation1.navigate(ROUTER.PROCESS_SCREEN, { total: total, subTotal: subTotal })}
                            >
                                <Text style={tw`text-white text-xl font-medium text-center `}>Proceed To Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            ) : (
                <View style={tw`flex-1 justify-center items-center}`}>
                    <Text style={tw`text-base my-3 text-center`}>Your shopping cart is empty</Text>
                    <View style={tw`flex items-center`}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('HomeTab')}
                            style={tw`w-40 py-3 bg-[${COLOR.PRIMARY}] rounded-md `}
                        >
                            <Text style={tw`text-[${COLOR.WHITE}] text-center text-lg font-medium`}>Go Shopping Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        width: 20,
        height: 20
    }
})