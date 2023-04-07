import { INIT_STATE } from "../constants";
import * as TYPES from '../constants/user'

export default function cartReducers(state = INIT_STATE.user, action) {
    switch (action.type) {
        // Get order by user id
        case TYPES.GET_ORDER_START:
            return {
                ...state,
            }
        case TYPES.GET_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload,
            }
        case TYPES.GET_ORDER_FAILURE:
            return {
                ...state,
            }
        default:
            return state
    }
}