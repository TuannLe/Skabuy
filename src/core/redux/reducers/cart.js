import { INIT_STATE } from "../constants";
import * as TYPES from '../constants/cart'

export default function authReducers(state = INIT_STATE.cart, action) {
    switch (action.type) {
        // Add item to cart
        case TYPES.ADD_ITEM_CART:
            const newArrayProduct = state.products
            newArrayProduct.push(action.payload)
            return {
                ...state,
                products: newArrayProduct,
            }
        // Change quantity
        case TYPES.CHANGE_QUANTITY:
            console.log('hihih', action.payload)
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
            newArray.splice(newArray.findIndex((item) => {
                return item.product_id == action.payload
            }), 1)
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
        default:
            return state
    }
}