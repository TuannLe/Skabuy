import * as TYPES from '../constants/product'

// Get product by category
export const GetProductByCategoryStart = (payload) => {
    return {
        type: TYPES.GET_PRODUCT_BY_CATEGORY_START,
        payload
    }
}

export const GetProductByCategorySuccess = (payload) => {
    return {
        type: TYPES.GET_PRODUCT_BY_CATEGORY_SUCCESS,
        payload
    }
}

export const GetProductByCategoryFailure = (payload) => {
    return {
        type: TYPES.GET_PRODUCT_BY_CATEGORY_FAILURE,
        payload
    }
}

// Get attribute by category
export const GetAttributeByCategoryStart = (payload) => {
    return {
        type: TYPES.GET_ATTRIBUTE_BY_CATEGORY_START,
        payload
    }
}

export const GetAttributeByCategorySuccess = (payload) => {
    return {
        type: TYPES.GET_ATTRIBUTE_BY_CATEGORY_SUCCESS,
        payload
    }
}

export const GetAttributeByCategoryFailure = (payload) => {
    return {
        type: TYPES.GET_ATTRIBUTE_BY_CATEGORY_FAILURE,
        payload
    }
}