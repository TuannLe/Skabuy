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

        // Get attribute by category
        case TYPES.GET_ATTRIBUTE_BY_CATEGORY_START:
            return {
                ...state,
                isLoading: true,
            }
        case TYPES.GET_ATTRIBUTE_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                attributes: action.payload
            }
        case TYPES.GET_ATTRIBUTE_BY_CATEGORY_FAILURE:
            return {
                ...state,
                error: true
            }

        // getProductsWithFilter
        case TYPES.GET_PRODUCT_WITH_FILTER_START:
            return {
                ...state,
                isLoading: true,
            }
        case TYPES.GET_PRODUCT_WITH_FILTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                productsByCategory: action.payload
            }
        case TYPES.GET_PRODUCT_WITH_FILTER_SUCCESS:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}