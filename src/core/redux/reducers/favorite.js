import { INIT_STATE } from "../constants";
import * as TYPES from '../constants/favorite'

export default function favoriteReducers(state = INIT_STATE.favorite, action) {
    switch (action.type) {
        // Add item to favorite
        case TYPES.ADD_ITEM_FAVORITE:
            const newArrayProduct = state.favorite
            if (newArrayProduct.length) {
                if (newArrayProduct.findIndex((item) => {
                    return item.product_id == action.payload.product_id
                }) == -1) {
                    newArrayProduct.push(action.payload)
                }
            } else {
                newArrayProduct.push(action.payload)
            }
            return {
                ...state,
                favorite: newArrayProduct,
            }
        // Remove item to favorite
        case TYPES.REMOVE_ITEM_FAVORITE:
            const newArray = [...state.favorite]
            console.log(action.payload)
            newArray.splice(newArray.findIndex((item) => {
                return item.product_id == action.payload
            }), 1)
            return {
                ...state,
                favorite: newArray
            }
        // Remove all item to favorite
        case TYPES.REMOVE_ALL_FAVORITE:
            return {
                ...state,
                favorite: []
            }
        default:
            return state
    }
}