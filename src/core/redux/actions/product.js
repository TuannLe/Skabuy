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


// Get attribute by category
export const getProductsWithFilterStart = (payload) => {
    return {
        type: TYPES.GET_PRODUCT_WITH_FILTER_START,
        payload
    }
}

export const getProductsWithFilterSuccess = (payload) => {
    return {
        type: TYPES.GET_PRODUCT_WITH_FILTER_SUCCESS,
        payload
    }
}

export const getProductsWithFilterFailure = (payload) => {
    return {
        type: TYPES.GET_PRODUCT_WITH_FILTER_FAILURE,
        payload
    }
}

export const searchProductStart = (payload) => {
    return {
        type: TYPES.SEARCH_PRODUCTS_START,
        payload
    }
}

export const searchProductSuccess = (payload) => {
    return {
        type: TYPES.SEARCH_PRODUCTS_SUCCESS,
        payload
    }
}

export const searchProductFailure = (error) => {
    return {
        type: TYPES.SEARCH_PRODUCTS_FAILURE,
        error
    }
}