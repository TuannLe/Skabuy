import { INIT_STATE } from "../constants";
import * as TYPES from '../constants/cart'

export default function cartReducers(state = INIT_STATE.cart, action) {
    switch (action.type) {
        // Add item to cart
        case TYPES.ADD_ITEM_CART:
            const newArrayProduct = state.products
            const productInCart = newArrayProduct.find(
                (p) =>
                    p.product_id == action.payload.product_id &&
                    JSON.stringify(p.characteristics) ==
                    JSON.stringify(action.payload.characteristics)
            );

            if (productInCart) {
                const objIndex = newArrayProduct.findIndex(
                    (obj) => obj.product_id === action.payload.product_id
                );
                if (newArrayProduct[objIndex].quantity === undefined) {
                    newArrayProduct[objIndex].quantity = action.payload.quantity;
                } else {
                    newArrayProduct[objIndex].quantity =
                        newArrayProduct[objIndex].quantity + action.payload.quantity;
                    newArrayProduct[objIndex].totalprice =
                        newArrayProduct[objIndex].quantity * newArrayProduct[objIndex].price;
                }
                state.products = [...newArrayProduct];
            } else {
                state.products = [...state.products, action.payload];
            }
            return {
                ...state,
            }
        // Change quantity
        case TYPES.CHANGE_QUANTITY:
            const newArrayChange = state.products
            const index = newArrayChange.findIndex(
                (item) => item.product_id == action.payload.productID
            );
            newArrayChange[index].quantity = action.payload.quantity;
            newArrayChange[index].totalprice = newArrayChange[index].quantity * newArrayChange[index].price;
            return {
                ...state,
                products: newArrayChange
            }
        // Remove item to cart
        case TYPES.REMOVE_ITEM_CART:
            const newArray = [...state.products]
            const objIndex = newArray.findIndex(
                (obj) =>
                    obj.product_id == action.payload.product_id &&
                    JSON.stringify(obj.characteristics) ==
                    JSON.stringify(action.payload.characteristics)
            );
            newArray.splice(objIndex, 1);
            return {
                ...state,
                products: newArray
            }
        // Remove all item to cart
        case TYPES.REMOVE_ALL_CART:
            return {
                ...state,
                products: []
            }
        case TYPES.ADD_ITEM_CHECKOUT:
            const newArrayCheckout1 = state.productsCheckout
            newArrayCheckout1.push(action.payload)
            return {
                ...state,
                productsCheckout: newArrayCheckout1,
            }
        case TYPES.REMOVE_ITEM_CHECKOUT:
            const newArrayCheckout2 = [...state.productsCheckout]
            newArrayCheckout2.splice(newArrayCheckout2.findIndex((item) => {
                return item.product_id == action.payload
            }), 1)
            return {
                ...state,
                productsCheckout: newArrayCheckout2
            }
        default:
            return state
    }
}