import * as TYPES from '../constants/user'

// Get order by user id
export const getOrderStart = (payload) => {
    console.log(payload)
    return {
        type: TYPES.GET_ORDER_START,
        payload
    }
}

export const getOrderSuccess = (payload) => {
    return {
        type: TYPES.GET_ORDER_SUCCESS,
        payload
    }
}

export const getOrderFailure = (error) => {
    return {
        type: TYPES.GET_ORDER_FAILURE,
        error
    }
}