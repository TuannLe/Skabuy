import { INIT_STATE } from "../constants";
import * as TYPES from '../constants/product'

export default function productReducers(state = INIT_STATE.product, action) {
    switch (action.type) {
        // Get product by category
        case TYPES.GET_PRODUCT_BY_CATEGORY_START:
            return {
                ...state,
                isLoading: true,
            }
        case TYPES.GET_PRODUCT_BY_CATEGORY_SUCCESS:
            console.log(action.payload.data)
            return {
                ...state,
                isLoading: false,
                productsByCategory: action.payload.data,
            }
        case TYPES.GET_PRODUCT_BY_CATEGORY_FAILURE:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}