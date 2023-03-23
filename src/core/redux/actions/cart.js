import * as TYPES from '../constants/cart'

// Add item to cart 
export const AddItemCart = (payload) => {
    return {
        type: TYPES.ADD_ITEM_CART,
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
