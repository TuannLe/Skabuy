import * as TYPES from '../constants/cart'

// Add item to cart 
export const AddItemCart = (payload) => {
    return {
        type: TYPES.ADD_ITEM_CART,
        payload
    }
}

// change quantity to cart 
export const ChangeQuantity = (payload) => {
    return {
        type: TYPES.CHANGE_QUANTITY,
        payload
    }
}

// Remove item to cart 
export const RemoveItemCart = (payload) => {
    return {
        type: TYPES.REMOVE_ITEM_CART,
        payload
    }
}

// Remove all item to cart 
export const RemoveAllCart = () => {
    return {
        type: TYPES.REMOVE_ALL_CART,
    }
}

// Add item to cart 
export const AddItemCheckout = (payload) => {
    return {
        type: TYPES.ADD_ITEM_CHECKOUT,
        payload
    }
}

// Remove item to cart 
export const RemoveItemCheckout = (payload) => {
    return {
        type: TYPES.REMOVE_ITEM_CHECKOUT,
        payload
    }
}

